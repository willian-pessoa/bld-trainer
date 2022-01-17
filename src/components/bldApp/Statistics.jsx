import React, { useState, useRef, useEffect } from "react";
import "./statistics.scss";
import * as d3 from "d3";

export default function Statistics() {
  const [data] = useState(JSON.parse(localStorage.getItem("dataUser")));
  const svgRef = useRef();

  useEffect(() => {
    // Data
    const arrLevels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      for (let j = 1; j <= 11; j++) {
        if (data[i].level === j) {
          arrLevels[j]++;
        }
      }
    }
    const arrRight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      for (let j = 1; j <= 11; j++) {
        if (data[i].level === j && data[i].isRight) {
          arrRight[j]++;
        }
      }
    }
    const arrWrong = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      for (let j = 1; j <= 11; j++) {
        if (data[i].level === j && !data[i].isRight) {
          arrWrong[j]++;
        }
      }
    }
    console.log(arrLevels);
    console.log(arrRight);
    console.log(arrWrong);

    // SVG
    const margin = 50;
    const w = 500;
    const h = 300;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#90A4AE");

    // Scalling
    const xScale = d3
      .scaleLinear()
      .domain([0, 11])
      .range([margin, w - margin]);
    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(arrLevels, function (d) {
          return d;
        }),
      ])
      .range([h - margin, 0]);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 25 + ")");

    // axis
    g.append("g")
      .attr("transform", "translate(0," + (h - margin) + ")")
      .call(d3.axisBottom(xScale));
    g.append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(function (d) {
            return d;
          })
          .ticks(d3.max(arrLevels, (d) => d))
      )
      .attr("transform", "translate(" + margin + "," + 0 + ")");

    // bars Right
    g.selectAll(".barR")
      .data(arrRight)
      .enter()
      .append("rect")
      .attr("class", "barRight")
      .attr("x", (d, index) => {
        return xScale(index) - 10;
      })
      .attr("y", (d, index) => {
        return yScale(d);
      })
      .attr("width", 20)
      .attr("height", (d, index) => {
        return h - margin - yScale(d);
      });

    g.selectAll(".barW")
      .data(arrWrong)
      .enter()
      .append("rect")
      .attr("class", "barWrong")
      .attr("x", (d, index) => {
        return xScale(index) - 10;
      })
      .attr("width", 20)
      .attr("y", (d, index) => {
        return yScale(arrLevels[index]);
      })
      .attr("height", (d, index) => {
        return h - margin - yScale(d);
      });

    // legend
    svg
      .append("circle")
      .attr("cx", 400)
      .attr("cy", 50)
      .attr("r", 6)
      .style("fill", "red");
    svg
      .append("circle")
      .attr("cx", 400)
      .attr("cy", 70)
      .attr("r", 6)
      .style("fill", "greenyellow");
    svg
      .append("text")
      .attr("x", 410)
      .attr("y", 50)
      .text("Wrong")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", 410)
      .attr("y", 70)
      .text("Right")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", w - 45)
      .attr("y", h - 20)
      .text("Levels")
      .style("font-size", "12px")

  }, [data]);

  return (
    <div className="statistics">
      <div className="graph">
        <svg ref={svgRef}></svg>
      </div>
      <div className="table">
        <h3>
          Max Level Reached:{" "}
          {
            data.reduce((prev, current) =>
              prev.level > current.level ? prev : current
            ).level
          }
        </h3>
        <br />
        <h3>Total Trys: {data.length - 1}</h3>
      </div>
    </div>
  );
}
