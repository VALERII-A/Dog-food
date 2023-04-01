import * as echarts from 'echarts'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';

export const Chart = () => {

  const text = 'Популярность';
  const navigate = useNavigate();

const {cards} = useContext(CardContext)


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
        type: 'category',
        boundaryGap: [0, 0.01],
        data: cards.sort((a, b) => a.likes.length - b.likes.length).map(e => e.name),
      },
      xAxis: {
        type: 'value',
        
      },
      series: [
        {
          name: 'Лайки',
          type: 'bar',
          data: cards.sort((a, b) => a.likes.length - b.likes.length).map(e => e.likes.length),
          color: "red"
        },
        {
          name: 'Отзывы',
          type: 'bar',
          data: cards.sort((a, b) => a.reviews.length - b.reviews.length).map(e => e.reviews.length),
          color: 'blue'
        }
      ],
      
      dataZoom: [
        {
          type: 'inside',
          yAxisIndex: [0, 1],
          start: 200,
          end: 180
        },
        {
          show: true,
          yAxisIndex: [0, 1],
          type: 'slider',
          bottom: 0, 
          start: 0,
          end: 150
        }
      ],
    };
    
    const chartDom = document.getElementById('chartsId')
    const myChart = echarts.init(chartDom)
    option && myChart.setOption(option)
  }, [cards])

  return (
    <>
     <span className='profile__back' onClick={()=>{navigate(-1)}}>
                {'< Назад'}
            </span>
      <div style={{ width: '100vh', height: '85vh' }} id="chartsId"></div>
    </>
  )
}
