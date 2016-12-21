function teamMainInit(){
	drawChartT(13, 11, 4);
	drawChart2T(11, 12, 2, 32, 15, 4, 10);
	drawChart3T(100, 56);
}

function drawChartT(win, lose, tie) {
    var myChart = echarts.init(document.getElementById('mainT'));

    //This value should be equal to the total number of matches played
    var totalNumber = win + lose + tie;

    //Persentage of each value
    var winP = parseInt(win / totalNumber * 100) + "%";
    var loseP = parseInt(lose / totalNumber * 100) + "%";
    var tieP = parseInt(tie / totalNumber * 100) + "%";

    // 指定图表的配置项和数据
    var option = {
        title: {
            show: true,
            subtext: totalNumber + "",
            subtextStyle: {
                color: '#ffffff',
                fontFamily: 'arial',
                fontWeight: 'normal',
                fontSize: 35

            },

            text: "Total Matches",
            textStyle: {
                color: '#ffffff',
                fontFamily: 'arial',
                fontWeight: 'normal',
                fontSize: 15
            },

            x: 'center',
            y: '32%'
        },

        series: [
            {
                name: 'Personal Data',
                type: 'pie',
                radius: ['75%', '100%'],
                avoidLabelOverlap: true,
                hoverAnimation: false,
                silent: true,
                label: {
                    normal: {
                        show: false,
                        position: 'outside',
                        textStyle: {
                            color: 'rgba(255, 255, 255, 1)',
                            fontSize: '20'
                        }
                    }

                },

                labelLine: {
                    normal: {
                        show: false,
                        smooth: false,
                        lineStyle: {
                            color: '#ffffff',
                            width: 2
                        }
                    }
                },

                data: [
                    {
                        value: win, name: '胜利\n' + winP,
                        itemStyle: {
                            normal: {
                                // 设置扇形的颜色
                                color: '#fdcb1d'
                            }
                        }

                    },

                    {
                        value: tie, name: '平局\n' + tieP,
                        itemStyle: {
                            normal: {
                                // 设置扇形的颜色
                                color: '#595757'
                            }
                        }
                    },

                    {
                        value: lose, name: '败北\n' + loseP,
                        itemStyle: {
                            normal: {
                                // 设置扇形的颜色
                                color: '#b5b5b6'
                            }
                        }
                    }
                ]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function drawChart2T(jan, feb, mar, apr, may, jun, jul){
    var myChart = echarts.init(document.getElementById('chart2T'));
    var option = {
        title : {
            show: true,
            text: 'Monthly Games',
            x: 'left',
            y: '13%',
            textStyle:{
                color: '#fdcb1d',
                fontStyle: 'normal',
                fontWeight: 'bolder',
                fontFamilty: 'arial',
                fontSize: 15
            }
        },
        color: ['#fdcb1d'],
        tooltip : {
            show: false
        },
        grid: {
            show: false,
            left: '3%',
            right: '2%',
            bottom: '3%',
            containLabel: true //是否显示xy轴label的开关
        },
        xAxis : [
            {
                position: 'bottom',
                type : 'category',
                data : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#595757'
                    }
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#ffffff"
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                interval : 10,
                minInterval: 1,
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#ffffff"
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#595757']
                    }
                }
            }
        ],
        series : [
            {
                name:'Monthly Games',
                type:'bar',
                legendHoverLink: false,
                barWidth: '60%',
                data:[jan, feb, mar, apr, may, jun, jul]

            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function drawChart3T(scored, lost){
	var myChart = echarts.init(document.getElementById('chart3T'));

	var option = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        show: false,
	        top: 'auto',
	    },
	    //Setup the Distance to each side of edge
	    grid: {
	    	top: '60%',
	        left: '0%',
	        right: '0%',
	        bottom: '0%',
	        containLabel: false //是否显示xy轴label的开关
	    },
	    xAxis : [
	        {
	            type : 'value',
	            axisLine : {show: false},
	            axisTick : {show: false},
	            splitLine: {
                    show: false
                },
	        }
	    ],
	    yAxis : [
	        {
	            type : 'category',
	            axisLine : {show: false},
	            axisTick : {show: false},
	            splitLine: {
                    show: false
                },
	            data : ['Goals']
	        }
	    ],
	    series : [
	        {
	            name:'Scored Goals',
	            type:'bar',
	            stack: 'Total',
	            label: {
	                normal: {
	                    show: true,
	                    position: "top",
	                    formatter: '{a}: {c}',
	                    textStyle: {
	                        fontStyle: 'normal', //Bold, bolder, lighter.....
	                        fontFamily: 'arial',
	                        fontSize : 17,
	                    }
	                }
	            },
	            data:[{
	                value: scored,
	                itemStyle: {
	                    normal: {
	                        color: '#fdcb1d',
	                    }
	                }
	            }]
	        },
	        {
	            name:'Lost Goals',
	            type:'bar',
	            stack: 'Total',
	            label: {
	                normal: {
	                    show: true,
	                    position: "top",
	                    formatter: '{a}: {c}',
	                    textStyle: {
	                        fontStyle: 'normal', //Bold, bolder, lighter.....
	                        fontFamily: 'arial',
	                        fontSize : 17,
	                    }
	                }
	            },
	            data:[{
	                value: -lost,
	                itemStyle: {
	                    normal: {
	                        color: '#b5b5b6',
	                    }
	                }
	            }]
	        },
	        
	    ]
	};
	
 // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}