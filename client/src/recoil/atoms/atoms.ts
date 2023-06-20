import { atom } from 'recoil'
import { static_items as defaultTodoList } from '../../components/Home/Todo/data'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const DefaultTodoList = atom({
    key: 'defaultTodoList',
    default: defaultTodoList
})

export const IsLogin = atom({
    key: 'IsLogin',
    default: false,
    effects_UNSTABLE: [persistAtom],
})

export const UserInfo = atom({
    key: 'UserInfo',
    default: {
        bio: '',
        memberId: '',
        memberStatus: '',
        nickname: '',
        premium: '',
        todomon: {
            backgroundColor: '',
            faceColor: '',
            leftEyeColor: '',
            rightEyeColor: '',
        },

    },
});