// console.log(d3);
// console.log(topojson);


const countyEducationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

const usaTopjsonURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const width = 800;
const height = 400;

const canva = d3.select("#canvas");




Promise.all([
    fetch(countyEducationURL).then(resp => resp.json()),
    fetch(usaTopjsonURL).then(resp => resp.json())
  ]).then(dataArr => {
    // document.querySelector(".loading-sheet").classList.add("visible");


    let tooltip = d3.select("#tooltip");


    
    const countyEducation = dataArr[0];
    const usaCounties = topojson.feature(dataArr[1], dataArr[1].objects.counties).features;

    // console.log(usaCounties);
    console.log(countyEducation);


        
    canva.selectAll("path")
            .data(usaCounties)
            .enter()
            .append("path")
            .attr("d", d3.geoPath())
            .attr("class", "county")
            .attr("fill", item => {
                let id = item.id;
                // console.log(id)
                let county = countyEducation.find(data => data.fips === id);

                let percentage = county.bachelorsOrHigher
                // console.log(percentage)

                return `rgb(${(255 * percentage) / 40}, ${(255 * percentage) / 40}, 0)`
            })
            .attr("data-fips", item => item.id)
            .attr("data-education", item => {
                let id = item.id;

                let county = countyEducation.find(data => data.fips === id);

                let percentage = county.bachelorsOrHigher;
                
                return percentage
            })
            .on("mouseover", (event, item) => {

                let id = item.id;

                let county = countyEducation.find(data => data.fips === id);

                tooltip.style("visibility", "visible")
                       .attr("data-education", county.bachelorsOrHigher)

                tooltip.text(`Percetage: ${county.bachelorsOrHigher}% | County: ${county.area_name} | State: ${county.state}`)

            })
            .on("mouseout", (e, item) => {
                tooltip.style("visibility", "hidden");
                tooltip.text("")
            })


            // console.log(tooltip)



        document.querySelector(".loading-sheet").classList.add("visible");
  })