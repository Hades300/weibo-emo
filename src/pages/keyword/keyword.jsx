import React, { useEffect,useState } from 'react'
import { useStateContext } from '../../reducer'
import { useSnackbar } from 'react-simple-snackbar'
import "./keyword.css"
import Window from '../../compoments/window/window'
import { useNavigate } from 'react-router-dom'
import { fetchKeywordList,createKeyword } from '../../utils'
import Modal from 'react-modal/lib/components/Modal'

const addIcon = <svg t="1648557782639"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2219" width="28" height="28"><path d="M510.833431 62.695924c-247.644193 0-448.406636 200.762443-448.406636 448.406636 0 247.65545 200.762443 448.416869 448.406636 448.416869 247.65545 0 448.416869-200.76142 448.416869-448.416869C959.2503 263.458367 758.488881 62.695924 510.833431 62.695924zM779.544429 562.112328 560.358381 562.112328l0 219.186048-102.008278 0L458.350103 562.112328 239.164055 562.112328l0-102.008278 219.186048 0L458.350103 240.918002l102.008278 0 0 219.186048 219.186048 0L779.544429 562.112328z" p-id="2220" fill="#137827"></path></svg>
const timeIcon = <svg t="1648559024229"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12143" width="28" height="28"><path d="M217.634 164.24h588.73c21.4 0 38.74-17.34 38.74-38.74-0.03-21.39-17.37-38.71-38.76-38.71h-588.71c-21.4 0-38.74 17.34-38.74 38.74 0.01 21.38 17.35 38.71 38.74 38.71z" fill="#EF7E20" p-id="12144"></path><path d="M806.364 187.02h-588.73c-33.91 0-61.5-27.58-61.52-61.47 0-33.95 27.6-61.55 61.52-61.55h588.72c33.89 0 61.49 27.57 61.54 61.47-0.01 33.95-27.61 61.55-61.53 61.55z m-588.73-77.46c-8.8 0-15.96 7.16-15.96 15.97 0 8.78 7.16 15.93 15.96 15.93h588.73c8.8 0 15.97-7.16 15.97-15.96-0.01-8.78-7.18-15.94-15.98-15.94h-588.72z" fill="#363432" p-id="12145"></path><path d="M217.634 937.23h588.73c21.4 0 38.74-17.34 38.74-38.74-0.02-21.38-17.36-38.71-38.74-38.71h-588.73c-21.4 0-38.74 17.34-38.74 38.74 0.01 21.38 17.35 38.71 38.74 38.71z" fill="#EF7E20" p-id="12146"></path><path d="M217.604 960c-16.41 0-31.84-6.39-43.46-17.99-11.62-11.61-18.02-27.07-18.03-43.48 0-33.93 27.6-61.53 61.52-61.53h588.73c33.89 0 61.49 27.57 61.52 61.46 0 33.95-27.6 61.55-61.52 61.55h-588.73 0.01c-0.01-0.01-0.03-0.01-0.04-0.01z m0.03-77.44c-8.8 0-15.96 7.16-15.96 15.96 0 4.26 1.66 8.26 4.67 11.27 3.01 3 7.01 4.66 11.26 4.66h588.76c8.8 0 15.97-7.16 15.97-15.96-0.01-8.76-7.17-15.93-15.97-15.93h-588.73z" fill="#363432" p-id="12147"></path><path d="M265.194 859.78c0-192.08 110.5-347.77 246.79-347.77s246.8 155.69 246.8 347.77h-493.59z" fill="#E9E7DF" p-id="12148"></path><path d="M758.784 882.56h-493.56c-12.58 0-22.81-10.2-22.81-22.78 0-204.32 120.93-370.56 269.57-370.56s269.57 166.24 269.57 370.56c0.01 12.57-10.18 22.78-22.77 22.78zM288.524 837h446.95c-8.09-168.62-105.23-302.22-223.47-302.22S296.614 668.37 288.524 837z" fill="#363432" p-id="12149"></path><path d="M758.784 164.24c0 192.08-110.5 347.77-246.79 347.77s-246.8-155.7-246.8-347.77h493.59z" fill="#E9E7DF" p-id="12150"></path><path d="M511.994 534.78c-148.65 0-269.57-166.22-269.57-370.54 0-12.58 10.2-22.78 22.78-22.78h493.59c12.58 0 22.78 10.2 22.78 22.78-0.01 204.32-120.94 370.54-269.58 370.54z m-223.47-347.76c8.09 168.61 105.23 302.2 223.47 302.2s215.38-133.59 223.47-302.2h-446.94z" fill="#363432" p-id="12151"></path><path d="M356.074 250.48h-86.76c-12.58 0-22.78-10.2-22.78-22.78 0-12.58 10.2-22.78 22.78-22.78h86.76c12.58 0 22.78 10.2 22.78 22.78 0 12.58-10.2 22.78-22.78 22.78z" fill="#363432" p-id="12152"></path><path d="M290.604 317.98C330.874 432.91 414.794 512 511.994 512c87.28 0 163.92-63.89 207.8-160.23l-429.19-33.79z" fill="#FFFBF1" p-id="12153"></path><path d="M511.994 527.19c-101.26 0-191.59-78.23-235.72-204.17-1.7-4.85-0.83-10.22 2.3-14.3 3.14-4.06 8.01-6.27 13.23-5.87l429.18 33.78c4.94 0.39 9.37 3.16 11.89 7.43 2.52 4.27 2.8 9.49 0.74 14-48.23 105.9-131.07 169.13-221.62 169.13z m-198.61-192.18c41.88 100.4 116.49 161.8 198.61 161.8 72.72 0 140.45-48.79 184.3-131.67l-382.91-30.13z" fill="#363432" p-id="12154"></path><path d="M611.874 705.33a767.174 767.174 0 0 0-93.26-20.2c-49.86-4.77-98.8 18.5-146.7 29.33l-90.24 20.41a474.673 474.673 0 0 0-16.48 124.91h493.56c0.08-42.19-5.46-84.2-16.48-124.92l-130.4-29.53z" fill="#FFFBF1" p-id="12155"></path><path d="M758.754 874.96h-493.56c-8.37 0-15.17-6.78-15.19-15.16a489.88 489.88 0 0 1 17-128.91c1.47-5.43 5.82-9.6 11.31-10.84l90.24-20.42c13.84-3.13 27.67-7.3 42.32-11.72 35.05-10.6 71.28-21.56 109.18-17.9 32.68 4.94 64.54 11.83 95.55 20.58l130.02 29.44c5.49 1.25 9.84 5.41 11.31 10.86 11.37 42 17.08 85.38 17 128.91-0.01 8.38-6.8 15.16-15.18 15.16z m-478.15-30.37h462.75c-1.02-32.7-5.52-65.21-13.44-96.96l-121.4-27.48c-0.26-0.06-0.52-0.13-0.78-0.21a758.846 758.846 0 0 0-91.41-19.8c-31.11-3.01-62.95 6.66-96.67 16.85-14.51 4.38-29.51 8.91-44.4 12.28l-81.22 18.38a459.674 459.674 0 0 0-13.43 96.94z" fill="#363432" p-id="12156"></path><path d="M511.994 590.08m-21.78 0a21.78 21.78 0 1 0 43.56 0 21.78 21.78 0 1 0-43.56 0Z" fill="#363432" p-id="12157"></path><path d="M511.994 665.01m-21.78 0a21.78 21.78 0 1 0 43.56 0 21.78 21.78 0 1 0-43.56 0Z" fill="#363432" p-id="12158"></path></svg>
const numIcon = <svg t="1648559137694" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13285" width="34" height="34"><path d="M420.266667 682.666667h85.333333c8.533333 0 12.8 2.133333 14.933333 6.4s0 8.533333-6.4 14.933333l-130.133333 142.933333c-4.266667 6.4-12.8 8.533333-19.2 8.533334s-14.933333-2.133333-19.2-8.533334l-130.133333-142.933333c-4.266667-4.266667-6.4-10.666667-6.4-14.933333s6.4-6.4 14.933333-6.4h85.333333v-512h113.066667l-2.133333 512z m396.8-228.266667h-57.6v-57.6h-113.066667v-228.266667h170.666667v285.866667z m-113.066667-228.266667v113.066667h57.6v-113.066667h-57.6z m57.6 627.2h-57.6v-228.266666h-57.6v-57.6h113.066667l2.133333 285.866666z" p-id="13286" fill="#1296db"></path></svg>

const snackBarOptions = {
  position: 'bottom-right',
  style: {
    backgroundColor: 'midnightblue',
    border: '2px solid lightgreen',
    color: 'lightblue',
    fontFamily: 'Menlo, monospace',
    fontSize: '20px',
    textAlign: 'center',
  },
  closeStyle: {
    color: 'lightcoral',
    fontSize: '16px',
  },
}

export default function Keyword() {

  const {keywordList,activeActionIndex,changeActiveAction,updateKeywordList} = useStateContext()
  const [keywordVersion,setKeywordVersion] = useState(0);

  // useSnackbar
  const [openSnackbar, closeSnackbar] = useSnackbar(snackBarOptions);
  
  // init keyword list from backend
  useEffect(
    () => {
      fetchKeywordList()
      .then(updateKeywordList)
      .catch(err=>{
        console.log(err)
        openSnackbar(err.message)
      })
    },[keywordVersion]
  )

  const keys = [
    {
      class:"key-sort-by-count",
      icon:numIcon,
      text:"???????????????"
    },
    {
      class:"key-sort-by-time",
      icon:timeIcon,
      text:"???????????????"
    }

  ]
  const sortByCount = (a,b) => {return b.count-a.count}
  const sortByTime = (a,b) => {return new Date(b.created_at)-new Date(a.created_at)}
  const sortFunc =  activeActionIndex==0?sortByCount:null || activeActionIndex==1?sortByTime:null || null
  const sortBy = (keywordList,sortFunc) => {
    if(sortFunc){
      let newKeywordList = [...keywordList]
      newKeywordList.sort(sortFunc)
      return newKeywordList
    }
    return keywordList
  }

  const navigate = useNavigate();


  const [addModal,setAddModal] = useState(false)
  const closeModal = () => {setAddModal(false)}
  const openModal = () => {setAddModal(true)}

  const [newKeyword,setNewKeyword] = useState("")
  
  return (
    <div className='keyword-container'>
      <div className="keyword-modal">
      <Modal
        isOpen={addModal}
        onRequestClose={closeModal}
        className="keyword-modal-content"
        contentLabel="onRequestClose Example"
        overlayClassName="keyword-modal-overlay"
      >
          <h2>???????????????</h2>
          <input type="text" placeholder='???????????????????????????' value={newKeyword} onChange={(e)=>{setNewKeyword(e.target.value)}}/>
          <button onClick={()=>{
            createKeyword(newKeyword)
            .then(closeModal)
            .then(()=>setKeywordVersion((e)=>e+1))
            .then(()=>setNewKeyword(''))
            .catch(err=>{
              console.log(err)
              openSnackbar(err.message)
            })
          }}>??????</button>
      </Modal>
      </div>
      <div className="window-wrapper">
        <Window/>
      </div>
      <div className='key-tool'>
        <div className="key-search left">
          <input type="text" placeholder="???????????????" />
        </div>
        <div className="key-action">
          <div className='key-add' onClick={openModal}>
              {addIcon}??????
          </div>
          {
            Array.prototype.map.call(keys,(item,index)=>{
              return (
              <div 
                className={`${item.class} ${activeActionIndex===index?'active':''}`}
                key={index}
                onClick={()=>{
                  if (index==activeActionIndex) changeActiveAction(-1);
                  else changeActiveAction(index)
                }}
                >
                {item.icon}{item.text}
              </div>)
            })
          }
        </div>
      </div>
      <div className='key-container'>
        {
          Array.prototype.map.call(sortBy(keywordList,sortFunc),({id,name,count,read_count},idx)=>{
            return (
              <div className='keyword-item' key={id} onClick={()=>navigate(`/keyword/${name}`)}>
                { count>0 && count!=read_count && <div className='keyword-item-badge'>{count-read_count}</div>}
                <h2 className='keyword-item-title'>{name}</h2>
                <p className='keyword-item-data'>?????????<span className='keyword-item-data-num'>{count}</span>???</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
