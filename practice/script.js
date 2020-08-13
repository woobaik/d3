const margin = { top: 20, right: 20, left: 50, bottom: 15 }
const svg = d3.select("svg")

const graphHeight = svg.attr("width") - margin.left - margin.right

const render = (data) => {
	const graph = svg
		.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`)
	const rects = graph.selectAll("rect").data(data)

	const xAxisGroup = graph
		.append("g")
		.attr("transform", `translate(0, ${graphHeight})`)
	const yAxisGroup = graph.append("g")

	const y = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.population)])
		.range([graphHeight, 0])

	const x = d3
		.scaleBand()
		.domain(data.map((item) => item.city))
		.range([0, 900])
		.padding(0.2)

	const xAxis = d3.axisBottom(x)
	const yAxis = d3.axisLeft(y)

	xAxisGroup.call(xAxis)
	yAxisGroup.call(yAxis)

	rects
		.enter()
		.append("rect")
		.attr("width", x.bandwidth())
		.attr("height", (d) => graphHeight - y(d.population))
		.attr("x", (d) => x(d.city))
		.attr("y", (d) => y(d.population))
		.attr("fill", "orange")
}

d3.json("data.json").then((data) => {
	data.forEach((item) => {
		item.population = Math.round(item.population / 1000)
	})

	render(data)
})
