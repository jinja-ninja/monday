import WorkInProgress from '../../assets/img/WorkInProgress.png'
import React, { useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';

export function DashboardDetails() {
    const [size, setSize] = useState({ width: 350, height: 350 })
    const chartRef = useRef(null);

    HighchartsMore(Highcharts);
    HighchartsExporting(Highcharts);

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Total Tasks status'
        },
        xAxis: {
            categories: ['Done', 'In Progress', 'Stuck']
        },
        series: [{
            data: [
                { y: 22, color: `var(--color-done-green)` },
                { y: 12, color: `var(--color-working_orange)` },
                { y: 4, color: `var(--color-stuck-red)` }
            ]
        }]
    }
    const options1 = {

        title: {
            text: 'Task Per Member'
        },
        xAxis: {
            categories: ['Omer Vered', 'Nati Feldbaum', 'Gal Ben Natan']
        },
        series: [{
            data: [
                { y: 45 },
                { y: 11 },
                { y: 28 }
            ]
        }]
    }
    const options2 = {

        title: {
            text: 'Total Members on Board (Past 5 Months)'
        },
        xAxis: {
            categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov']
        },
        series: [{
            data: [
                { y: 2 },
                { y: 3 },
                { y: 6 },
                { y: 4 },
                { y: 5 }
            ]
        }]
    }

    const pieOptions = {
        chart: {
            type: 'pie',
            plotShadow: false,
            backgroundColor: 'transparent'
        },
        title: {
            text: 'Active Users on Total Boards'
        },
        plotOptions: {
            pie: {
                innerSize: '50%',
                depth: 45
            }
        },
        series: [{
            name: 'Data',
            data: [
                ['Management', 10],
                ['Team Leaders', 60],
                ['Group Leaders', 30]
            ]
        }]
    };


    const chart1Options = {
        chart: {
            type: 'column',
            backgroundColor: '#f5f5f5',
            borderRadius: 5
        },
        title: {
            text: 'Sales Data',
            style: {
                color: '#333333',
                fontWeight: 'bold',
                fontSize: '18px'
            }
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            labels: {
                style: {
                    color: '#666666'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Amount',
                style: {
                    color: '#666666'
                }
            },
            labels: {
                style: {
                    color: '#666666'
                }
            }
        },
        series: [{
            name: 'Sales',
            data: [100, 200, 150, 300, 250, 180],
            color: '#7cb5ec'
        }],
        credits: {
            enabled: false
        }
    }

    return (
        // <div className="dashboard-container">
        //     <img className='in-progress-img' src={WorkInProgress} alt="" />
        // </div>
        <div className='dashboard-container'>

            <div className='box show-border' style={{ width: size.width + 'px', height: size.height + 'px' }} >
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    ref={chartRef}
                />
            </div>
            <div className='box show-border' style={{ width: size.width + 'px', height: size.height + 'px' }} >
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options1}
                    ref={chartRef}
                />
            </div>
            <div className='box show-border' style={{ width: size.width + 'px', height: size.height + 'px' }} >
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options2}
                    ref={chartRef}
                />
            </div>

            <div className='box1 show-border'>
                <HighchartsReact highcharts={Highcharts} options={pieOptions} />
            </div>

        </div >
    )
}