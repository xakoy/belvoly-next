/** @format */

import { log } from '../log'
import { registerCallback } from './core'

export async function execute<T>(
    service: string,
    action: string,
    args: { [key: string]: any } = {},
    handle?: (data: T) => void
) {
    return new Promise<T>(resolve => {
        var callbackID = registerCallback(data => {
            handle && handle(data as T)
            resolve(data as T)
        })
        var arg = JSON.stringify(args)

        log('service:' + service + ', action:' + action + ', args:' + arg + ', callbackID: ' + callbackID)
        ;(window as any)._belvolyNative.exec(service, action, callbackID, arg)
    })
}
