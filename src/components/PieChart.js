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
            }
        }
    }

    componentDidMount() {
        this.getData();
    }  

    componentDidUpdate(){
        this.getData();
    }

    getData() {
        const chartData = this.prepareData(this.props.meal);
        this.createChart(chartData);

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

    createChart = (data) => {
        const ctx = document.querySelector('#meals');
        
        let mealsChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                
                animation: {
                    animateScale: true,
                    
                    duration: 10000
                },
                legend: {
                    labels: {
                        fontColor: 'white'                        
                    }
                }
            }            
        })
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