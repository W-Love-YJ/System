import myAxios from '@/customparts/myAxios'

// 登录
export async function login(data) {
    return myAxios({
        url: '/login',
        method: 'post',
        data,
    })
}

// 获取菜单数据
export async function getMenu() {
    return myAxios({
        url: '/sysmenu',
        method: 'post'
    })
}
export async function text(data) {
    return myAxios({
        url: '/component/table',
        method: 'post',
        data,
    })
}