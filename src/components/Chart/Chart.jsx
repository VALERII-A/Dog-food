import * as echarts from 'echarts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Chart = () => {

  const text = 'Заказы и посещаемость';
  const navigate = useNavigate();


  useEffect(() => {
    const option = {
      title: {
        text: text,
        textStyle: {
          fontFamily: 'Nunito',
          fontSize: '22px'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        textStyle: {
          fontFamily: 'Nunito',
          fontSize: '16px',
        },
        top: '3px'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      xAxis: {
        type: 'category',
        data: ['Январь', 'Февраль', 'Март', 'Апрель', ]
      },
      series: [
        {
          name: 'Заказы',
          type: 'bar',
          data: [17533, 3489, 14646,6244, 0],
          color: '#747474'
        },
        {
          name: 'Посещаемость',
          type: 'bar',
          data: [18493, 12686, 23665, 12355, 0, 0],
          color: '#fed700'
        }
      ],
      
      // dataZoom: [
      //   {
      //     type: 'inside',
      //     xAxisIndex: [0, 1],
      //     start: 0,
      //     end: 150
      //   },
      //   {
      //     show: true,
      //     xAxisIndex: [0, 1],
      //     type: 'slider',
      //     bottom: 200,
      //     start: 0,
      //     end: 150
      //   }
      // ], 
    };
    
    const chartDom = document.getElementById('chartsId')
    const myChart = echarts.init(chartDom)
    option && myChart.setOption(option)
  }, [])

  return (
    <>
     <span className='profile__back' onClick={()=>{navigate(-1)}}>
                {'< Назад'}
            </span>
      <div style={{ width: '100%', height: 500 }} id="chartsId"></div>
    </>
  )
}
