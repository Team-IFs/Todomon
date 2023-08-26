import { atom } from 'recoil'
import { static_items as defaultTodoList } from '../../components/Home/Todo/data'
import { recoilPersist } from 'recoil-persist'
import { User } from '../../types/user'
import { today } from '../../utils/today'

const { persistAtom } = recoilPersist()

export const DefaultTodoList = atom({
    key: 'defaultTodoList',
    default: defaultTodoList
})

export const TodoList = atom({
    key: 'TodoList',
    default: [],
})

export const MontlyTodo = atom({
    key: 'MontlyTodo',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const CurrentDay = atom({
    key: 'CurrentDay',
    default: today('fymd')
})

export const IsLogin = atom({
    key: 'IsLogin',
    default: false,
    effects_UNSTABLE: [persistAtom],
})
export const TempDarkMode = atom({
    key: 'TempDarkMode',
    default: false,
    effects_UNSTABLE: [persistAtom],
})
export const UserInfo = atom<User>({
    key: 'UserInfo',
    default: {
        bio: '',
        memberId: -1,
        memberStatus: '',
        nickname: '',
        premium: false,
        todomon: {
            backgroundColor: '',
            faceColor: '',
            leftEyeColor: '',
            rightEyeColor: '',
        },
    },
    effects_UNSTABLE: [persistAtom]
});
export const CurrentClickedPart = atom({
    key: 'currentClickedPart',
    default: 'backgroundColor',
})

export const CurrentClickedUser = atom({
    key: 'currentClickedUser',
    default: {
        bio: '',
        memberId: -1,
        memberStatus: '',
        nickname: '',
        premium: false,
        todomon: {
            backgroundColor: '',
            faceColor: '',
            leftEyeColor: '',
            rightEyeColor: '',
        },
    },
    effects_UNSTABLE: [persistAtom]
})