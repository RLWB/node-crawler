def saerch(keyword,web_session,a1):
    headers = {
        "accept":"application/json, text/plain, */*",
        "cache-control":"no-cache",
        "content-type":"application/json;charset=UTF-8",
        "cookie":f"a1={a1}; web_session={web_session};",
        "origin":"https://www.xiaohongshu.com",
        "referer":"https://www.xiaohongshu.com/",
        "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "x-b3-traceid":"a31fffc0ee4f5d8f",
        "x-s-common":"",
    }
    data = {"keyword":keyword,"page":1,"page_size":20,"search_id":J(),"sort":"general","note_type":0}
    exc = execjs.compile(open('xs20230531.js', 'r', encoding='utf-8').read())
    xs_xt = exc.call('get_xs','/api/sns/web/v1/search/notes',data,a1)
    xs_xt['X-t'] = str(xs_xt['X-t'])
    headers.update(xs_xt)
    feed = 'https://edith.xiaohongshu.com/api/sns/web/v1/search/notes'
    print(requests.post(url=feed,data=json.dumps(data,separators=(",", ":"),ensure_ascii=False).encode('utf-8'), headers=headers).text)