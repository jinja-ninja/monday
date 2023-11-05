import WorkInProgress from '../../assets/img/WorkInProgress.png'
import React, { useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';

export function DashboardDetails() {
    const chartRef = useRef(null);

    HighchartsMore(Highcharts);
    HighchartsExporting(Highcharts);

    const totalTasks = [35, 45, 67, 70, 65, 74, 89, 88, 79, 68, 72, 61]
    const doneTasks = [23, 40, 67, 51, 64, 70, 36, 69, 72, 43, 60, 45]

    const sumOfTotalTasks = totalTasks.reduce((acc, currVal) => acc + currVal, 0)
    const sumOfDoneTasks = doneTasks.reduce((acc, currVal) => acc + currVal, 0)

    const percentage = ((sumOfDoneTasks / sumOfTotalTasks) * 100).toFixed(2)
    console.log('percentage:', percentage)

    const tasksOptions = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'R&D tasks completed on time'
        },
        xAxis: {
            categories: [, 'Nov 22', 'Dec 22', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct'],
            accessibility: {
                description: 'Months of the year'
            }
        },
        yAxis: {
            title: {
                text: 'Tasks'
            },

        },
        series: [{
            name: 'Total Tasks',
            data: totalTasks,
            color: 'var(--color-done-green)'
        }, {
            name: 'Finished Before DueDate',
            data: doneTasks
        }]
    }


    const optionsOmer = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Omer V tasks status'
        },
        xAxis: {
            categories: ['Done', 'In Progress', 'Stuck']
        },
        series: [{
            data: [
                { y: 22, color: 'var(--color-done-green)' },
                { y: 12, color: 'var(--color-working_orange)' },
                { y: 4, color: 'var(--color-stuck-red)' }
            ]
        }]
    }

    const optionsNati = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Nati F tasks status'
        },
        xAxis: {
            categories: ['Done', 'In Progress', 'Stuck']
        },
        series: [{
            data: [
                { y: 12, color: 'var(--color-done-green)' },
                { y: 10, color: 'var(--color-working_orange)' },
                { y: 18, color: 'var(--color-stuck-red)' }
            ]
        }]
    }
    const optionsGal = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Gal B tasks status'
        },
        xAxis: {
            categories: ['Done', 'In Progress', 'Stuck']
        },
        series: [{
            data: [
                { y: 17, color: 'var(--color-done-green)' },
                { y: 5, color: 'var(--color-working_orange)' },
                { y: 3, color: 'var(--color-stuck-red)' }
            ]
        }]
    }


    return (
        // <div className="dashboard-container">
        //     <img className='in-progress-img' src={WorkInProgress} alt="" />
        // </div>
        <div className='dashboard-container'>
            <div className='chart-data-container'>
                <div className='chart-info show-border'>
                    <div className='completed-tasks'>
                        <h1>Completed tasks on time</h1>
                        <p>78.72 %</p>
                    </div>
                </div>
                <div className='chart-info show-border'>
                    <div className='completed-tasks'>
                        <h1>Performance years to review</h1>
                        <p style={{ color: 'var(--color-stuck-red)' }}> 2022 - 2023</p>
                    </div>
                </div>
            </div>
            <div className='line-chart'>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={tasksOptions}
                />
            </div>
            <div className='members-chart'>
                <div className='box show-border'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={optionsOmer}
                        ref={chartRef}
                    />
                </div>
                <div className='box show-border'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={optionsNati}
                        ref={chartRef}
                    />
                </div>
                <div className='box show-border'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={optionsGal}
                        ref={chartRef}
                    />
                </div>

            </div >
        </div >
    )
}