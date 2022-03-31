import { useReducer,useContext,createContext } from "react";

const actions = {
    ACTIVE_TAB_CHANGE : "ACTIVE_TAB_CHANGE",
    ACTIVE_ACTION_CHANGE : "ACTIVE_ACTION_CHANGE",
}


let stateContext = createContext();
let initialState = {
    activeTabIndex: 0,
    activeActionIndex: -1,
    latestWeiboCards:[
        {
            "text": "最近突然理解了为什么英国人在二战炮火的废墟中喝茶，为什么lockdown里gym也不关，为什么疫情一开始最严重的时候也允许让人们一天出来一趟，除了买菜还要do essential exercise，该散步的继续散步。维持人性是种日常实践。 ",
            "uid": 1985359735,
            "like_count": 472,
            "comment_count": 24,
            "utc_created": "2022-03-31 03:17:29",
            "id": 4752919804772822,
            "repost_id": null,
            "repost_count": 227,
            "search_keyword": "张文宏医生",
            "utc_crawled": "2022-03-31 13:28:43"
        },
        {
            "text": "我开始看到抖那个吐槽的时候还以为是个例，直到看到大家的评论我算是顿悟了，原来当地很多基层组织能力是真的 间隔距离和按栋统计下楼核酸等等这些真的是基本操作了竟然那么多小区都是等外地医护去了才开始啊那以前做核酸不是折腾居民和当地医护吗 ",
            "uid": 1645255202,
            "like_count": 46803,
            "comment_count": 2533,
            "utc_created": "2022-03-31 00:31:44",
            "id": 4752878092158300,
            "repost_id": null,
            "repost_count": 4922,
            "search_keyword": "张文宏医生",
            "utc_crawled": "2022-03-31 13:32:19"
        },
        {
            "text": "这几天有事，微博刷得少，也因为假话不想说且不太会说，真话又实在伤人。对满屏的疫情信息及各地各种的抱怨和诉苦，我真的无感。回想武汉女作家遭受的我见过的最惨烈最恶毒的网暴，我早对一切疫情信息都无感了。即使疫情影响了透析会危及生命这样的事，我看着都无感了，内心丝毫引不起涟漪。我相信这 ...全文",
            "uid": 3877093085,
            "like_count": 6431,
            "comment_count": 580,
            "utc_created": "2022-03-30 10:09:50",
            "id": 4752661187922742,
            "repost_id": null,
            "repost_count": 640,
            "search_keyword": "张文宏医生",
            "utc_crawled": "2022-03-31 13:26:42"
        },
        {
            "text": "这几天有事，微博刷得少，也因为假话不想说且不太会说，真话又实在伤人。对满屏的疫情信息及各地各种的抱怨和诉苦，我真的无感。回想武汉女作家遭受的我见过的最惨烈最恶毒的网暴，我早对一切疫情信息都无感了。即使疫情影响了透析会危及生命这样的事，我看着都无感了，内心丝毫引不起涟漪。我相信这 ...全文",
            "uid": 3877093085,
            "like_count": 6431,
            "comment_count": 580,
            "utc_created": "2022-03-30 10:09:50",
            "id": 4752661187922742,
            "repost_id": null,
            "repost_count": 640,
            "search_keyword": "张文宏医生",
            "utc_crawled": "2022-03-31 13:26:42"
        },
        {
            "text": "这几天有事，微博刷得少，也因为假话不想说且不太会说，真话又实在伤人。对满屏的疫情信息及各地各种的抱怨和诉苦，我真的无感。回想武汉女作家遭受的我见过的最惨烈最恶毒的网暴，我早对一切疫情信息都无感了。即使疫情影响了透析会危及生命这样的事，我看着都无感了，内心丝毫引不起涟漪。我相信这 ...全文",
            "uid": 3877093085,
            "like_count": 6431,
            "comment_count": 580,
            "utc_created": "2022-03-30 10:09:50",
            "id": 4752661187922742,
            "repost_id": null,
            "repost_count": 640,
            "search_keyword": "张文宏医生",
            "utc_crawled": "2022-03-31 13:26:42"
        },
        {
            "text": "这几天有事，微博刷得少，也因为假话不想说且不太会说，真话又实在伤人。对满屏的疫情信息及各地各种的抱怨和诉苦，我真的无感。回想武汉女作家遭受的我见过的最惨烈最恶毒的网暴，我早对一切疫情信息都无感了。即使疫情影响了透析会危及生命这样的事，我看着都无感了，内心丝毫引不起涟漪。我相信这 ...全文",
            "uid": 3877093085,
            "like_count": 6431,
            "comment_count": 580,
            "utc_created": "2022-03-30 10:09:50",
            "id": 4752661187922742,
            "repost_id": null,
            "repost_count": 640,
            "search_keyword": "张文宏医生",
            "utc_crawled": "2022-03-31 13:26:42"
        }
    ],
    keywordList:[
        {
            "created_at": "2022-03-30 12:22:04",
            "is_deleted": false,
            "id": 1,
            "updated_at": null,
            "name": "辉瑞疫苗",
            "sys_user_id": -1,
            "count": 5
        },
        {
            "created_at": "2022-02-30 12:22:04",
            "is_deleted": false,
            "id": 2,
            "updated_at": null,
            "name": "张文宏医生",
            "sys_user_id": -1,
            "count": 20
        }
    ]
};

function reducer(state,{type,payload}) {
    switch (type) {
        case actions.ACTIVE_TAB_CHANGE:
            return {
                ...state,
                activeTabIndex: payload,
            };
        case actions.ACTIVE_ACTION_CHANGE:
            return {
                ...state,
                activeActionIndex: payload,
            };
        default:
            return initialState;
    }
}

export function StateProvider({children}) {
    let [state, dispatch] = useReducer(reducer, initialState);
    const changeActiveTab = (index) => {dispatch({type: actions.ACTIVE_TAB_CHANGE, payload: index})};
    const changeActiveAction = (index) => {dispatch({type: actions.ACTIVE_ACTION_CHANGE, payload: index})};
    return (
        <stateContext.Provider value={{...state,dispatch,
            changeActiveTab,
            changeActiveAction
        }}>
            {children}
        </stateContext.Provider>
    );
}


export function useStateContext() {
    return useContext(stateContext);
}
