import { InvalidAuthorizeStateError } from "../basic/error"

export async function validateAuthorizeState(){

}

export async function oauth20CompleteCallback(code) {
    if(code === undefined) throw new InvalidAuthorizeStateError("授权请求失败：无效的授权代码");

}

async function getUserAccessToken(code) {

}