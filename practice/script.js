const svg = d3
	.select(".canvas")
	.append("svg")
	.attr("width", 600)
	.attr("height", 600)

const margin = { top: 20, right: 50, bottom: 20, left: 50 }
const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom
const graph = svg
	.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top})`)

d3.json("data.json").then((data) => {
	const rects = graph.selectAll("rect").data(data)

	const min = d3.min(data, (data) => data.population)
	console.log(min)

	const x = d3
		.scaleBand()
		.domain(data.map((d) => d.city))
		.range([0, 500])

	const y = d3
		.scaleLinear()
		.domain([0, d3.max(data, (data) => data.population)])
		.range([0, 500])

	rects
		.enter()
		.append("rect")
		.attr("width", x.bandwidth)
		.attr("height", (d) => y(d.population))
		.attr("x", (d, i, n) => i * 90)
		.attr("fill", "pink")
})
