import React, { useEffect,forwardRef, useMemo } from 'react'
import { useStateContext } from '../../reducer'
import "./window.css"
import { fetchLatestPosts,timeAgo } from '../../utils'
import TextScroll from '../textscroll/textscroll'

const weiboIcon = <svg t="1648728314337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5284" width="32" height="32"><path d="M512 64C264.590222 64 64 264.590222 64 512S264.590222 960 512 960 960 759.409778 960 512 759.409778 64 512 64z m-44.373333 672c-114.517333 0-231.623111-55.608889-231.623111-147.114667 0-47.786667 30.208-103.082667 82.289777-155.306666 69.518222-69.575111 150.613333-101.376 181.105778-70.769778 13.511111 13.482667 14.791111 36.778667 6.115556 64.568889-4.522667 14.023111 13.084444 6.314667 13.084444 6.314666 56.206222-23.608889 105.187556-25.002667 123.107556 0.711112 9.585778 13.710222 8.590222 32.796444-0.199111 55.096888-4.096 10.211556 1.28 11.804444 8.988444 14.108445 31.715556 9.784889 66.901333 33.564444 66.901333 75.491555 0.199111 69.489778-99.697778 156.899556-249.799111 156.899556z m207.274666-290.787556a34.901333 34.901333 0 0 0-22.300444-43.918222 34.645333 34.645333 0 0 0-18.005333-0.881778 18.289778 18.289778 0 0 1-21.731556-21.191111 18.204444 18.204444 0 0 1 14.136889-14.506666c24.092444-5.12 50.090667 2.275556 67.697778 21.902222 17.692444 19.569778 22.414222 46.279111 14.904889 69.774222a18.147556 18.147556 0 0 1-29.127112 8.248889 18.147556 18.147556 0 0 1-5.575111-19.427556z m105.984 34.275556s0 0.113778 0 0a21.048889 21.048889 0 0 1-38.912 3.185778 21.191111 21.191111 0 0 1-1.28-16.184889 104.021333 104.021333 0 0 0-120.604444-133.888 21.134222 21.134222 0 0 1-25.230222-24.547556 21.105778 21.105778 0 0 1 16.355555-16.839111 145.92 145.92 0 0 1 139.093334 45.084445 146.432 146.432 0 0 1 30.577777 143.189333z m-334.506666 6.115556c-91.392 8.988444-160.682667 65.080889-154.680889 125.184 5.888 60.103111 84.792889 101.518222 176.213333 92.501333 91.392-9.102222 160.711111-65.080889 154.680889-125.297778-5.888-60.103111-84.792889-101.489778-176.184889-92.387555z m80.213333 141.710222c-18.688 42.296889-72.305778 64.796444-117.788444 50.062222-43.889778-14.165333-62.492444-57.685333-43.292445-96.768 18.887111-38.4 67.982222-60.103111 111.502222-48.810667 44.999111 11.690667 67.982222 54.215111 49.578667 95.488z m-93.013333-32.199111c-14.165333-5.916444-32.369778 0.170667-41.187556 13.880889-8.817778 13.795556-4.693333 30.208 9.301333 36.608 14.307556 6.485333 33.223111 0.284444 42.012445-13.795556 8.817778-14.307556 4.181333-30.606222-10.097778-36.693333z m34.929777-14.506667c-5.404444-2.218667-12.231111 0.483556-15.416888 5.802667-3.100444 5.404444-1.393778 11.491556 4.096 13.795555 5.518222 2.275556 12.600889-0.284444 15.815111-5.802666 2.986667-5.603556 0.995556-11.804444-4.494223-13.795556z" p-id="5285" fill="#d81e06"></path></svg>

const Window  = ({keyword,count,state={}},ref) =>{
    const {latestWeiboCards,updateLatestWeiboCards,customWeiboCards,updateCustomWeiboCards} = state
    let cards = latestWeiboCards
    if (keyword){
        cards = customWeiboCards[keyword] || cards
    }
    const updateFunc = keyword?(cards)=>updateCustomWeiboCards(keyword,cards):updateLatestWeiboCards
    useEffect(()=>{
        fetchLatestPosts(keyword,count)
        .then(updateFunc)
        .catch(err=>{
            console.log("window fetchLatestPosts err:",err)   
        })
    },[]);

    const openWindow = (url) => {window.open(url)}
  return (
    <div className="window-container" ref={ref}>
        {/* <h2>Latest Post</h2> */}
        <div className="window-real-container">
        {
            Array.prototype.map.call(cards,({text,id,like_count,repost_count,utc_created,uid,desktop_url,reason},index)=>{
                return (
                    <div className="window-item" key={id}>
                        <div className="window-item-content" dangerouslySetInnerHTML={{__html:text}}>
                        </div>
                        <div className="window-item-badge">
                            <span className='window-item-weibo' onClick={()=>{openWindow(desktop_url)}}>{weiboIcon}</span>
                            <span className="window-item-time">{timeAgo(new Date(utc_created))}</span>
                            <span className='window-item-like'>{like_count+"👍"}</span>
                            <span className='window-item-repost'>{repost_count+"🔁"}</span>
                        </div>
                        <div className="window-item-reason-scroll">
                            <TextScroll content={reason || ""} duration={reason?reason.length*0.3:3} key={reason}/>
                        </div>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

const InnerForwardRef = React.forwardRef(Window)

const MemoWindow = ({keyword,count},ref) =>{
    const {latestWeiboCards,updateLatestWeiboCards,customWeiboCards,updateCustomWeiboCards} = useStateContext()

    return useMemo(
        ()=>{
            return (
                <InnerForwardRef keyword={keyword} count={count} state={{latestWeiboCards,updateLatestWeiboCards,customWeiboCards,updateCustomWeiboCards}} ref={ref}/>
            )
        }
    ,[latestWeiboCards,customWeiboCards,keyword,count])
    
}

const ForwardRefWindow = forwardRef(MemoWindow)


export default ForwardRefWindow
