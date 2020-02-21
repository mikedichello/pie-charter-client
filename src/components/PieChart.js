import React, { Component } from 'react';
import Chart from 'chart.js'

class PieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            chosenMeal: {},
            formInputs: {
                name: '',
                description: '',
                calories: '',
                carbs_g: '',
                fat_g: '',
                protein_g: '',
            },
            mealsChart: null,
        }
    }

    componentDidMount() {
        this.createChart();
    }  

    componentDidUpdate(){
        this.updateChart();
    }

    createChart = () => {
        // create a query selector for the canvas
        const ctx = document.querySelector('#meals');
        
        // Create a new chart with empty data
        const mealsChart = new Chart(ctx, {
            type: 'pie',
            data: {},
            options: {                
                animation: {
                    animateScale: true,                    
                    duration: 2000
                },
                legend: {
                    labels: {
                        fontColor: 'white'                        
                    }
                }
            }            
        });

        // Store this chart object in state
        this.setState({mealsChart})
    }

    updateChart() {
        // Get chart data for specific meal prop
        const chartData = this.prepareData(this.props.meal);
        // pull chart object out of current state
        const { mealsChart } = this.state;

        // Replace current data with updated data.
        // NOTE: this goes against their documentation
        // Their recommendation is to remove all elements from the array with .pop()
        // Then add the new elements with .push()
        // TODO: update this to not reassign data
        mealsChart.data = chartData;

        // Call update on the chart object triggering a re-render
        mealsChart.update();
    }

    prepareData = (meal) => {
        const chartData = {
            labels: ["Carbs (g)", "Fat (g)", "Protein (g)"],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        'rgb(20,167,108, .2)',
                        'rgb(255,228,0, .2)',
                        'rgb(255,101,47, .2)'
                    ],
                    borderColor: [
                        'rgb(20,167,108, 1)',
                        'rgb(255,228,0,1)',
                        'rgb(255,101,47, 1)'
                    ],
                    borderWidth: 2
                }                                
            ]
        }
        
        chartData.datasets[0].data.push(meal.carbs_g)
        chartData.datasets[0].data.push(meal.fat_g)
        chartData.datasets[0].data.push(meal.protein_g)  
        return chartData
    }

    render () {
        return (
            <>
            
                <canvas id="meals" width="300" height="100"></canvas>

            </>
        )
    }
}
export default PieChart