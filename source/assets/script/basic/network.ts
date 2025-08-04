import { WebRequestWError } from "./error";

export async function sendRequest(
    url,
    method,
    headers,
    data,
    timeout,
    retry = 3
) {
    if(url === undefined) throw new WebRequestWError(`${url} 不是有效的 URI`);
    if(method === undefined) throw new WebRequestWError(`${method} 不是有效的 HTTP 请求方法`);
    while(retry >=0){
        retry --;
        await fetch(
            url,{
                method:method.to
            }
        )
    }
}