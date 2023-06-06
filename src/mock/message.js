import Mock from "mockjs";
import qs from 'querystring'
Mock.mock('/api/message','post',{
    code:0,
    msg:"",
    data:{
        id: "@guid",
        nickname: "@cname(2,4)",
        content: "@cparagraph(1, 10)",
        createDate: "@now('yyyy-MM-dd HH:mm:ss')",
        "avatar|1": [
            "https://img2.baidu.com/it/u=259936387,3392805997&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
            "https://img0.baidu.com/it/u=307688776,919360174&fm=253&fmt=auto&app=138&f=JPEG?w=319&h=325",
            "https://img0.baidu.com/it/u=2710409385,4138947046&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
            "https://img0.baidu.com/it/u=1053789859,407684037&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500"
        ],
      },
})
Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", function(options) {
    const query = qs.parse(options.url);
    return Mock.mock({
      code: 0,
      msg: "",
      data: {
        'total|10-120': 0,
        [`rows|${query.limit || 10}`]: [
          {
            id: "@guid",
            nickname: "@cname(2,4)",
            content: "@cparagraph(1, 10)",
            createDate: "@now('yyyy-MM-dd HH:mm:ss')",
            "avatar|1": [
                "https://img2.baidu.com/it/u=259936387,3392805997&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
                "https://img0.baidu.com/it/u=307688776,919360174&fm=253&fmt=auto&app=138&f=JPEG?w=319&h=325",
                "https://img0.baidu.com/it/u=2710409385,4138947046&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
                "https://img0.baidu.com/it/u=1053789859,407684037&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500"
            ],
          },
        ],
      },
    });
  });