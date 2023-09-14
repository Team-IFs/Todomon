import { useRecoilState } from 'recoil';
import { UserInfo } from '../recoil/atoms/atoms';

const Cat = () => {
  const [userInfo] = useRecoilState(UserInfo);
  return <>
  <svg version="1.1" id="Layer_1" xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500">
          <style type="text/css">{`
            .st0{fill:${userInfo.todomon.faceColor};}
            .st1{fill:${userInfo.todomon.rightEyeColor};}
            .st2{fill:${userInfo.todomon.leftEyeColor};}
            .st3{fill:${userInfo.todomon.backgroundColor};}
            `}
          </style>
          <ellipse id="background" className="st0" cx="250" cy="250" rx="242" ry="242" />
          <g>
            <circle id="rightEye" className="st1" cx="306.5" cy="295" r="25" />
            <circle id="leftEye" className="st2" cx="193.4" cy="295" r="25" />
            <path id="body" className="st3" d="M367.6,117.7c-21.6,13.4-43.9,30.3-61,41.5c-17.5-6.1-36.6-9.5-56.8-9.5c-20,0-39.1,3.4-56.5,9.4
              c-17.1-11.2-39.3-28.1-60.9-41.4c-36.6-22.6-31.3,114.2-29.6,147c-0.2,2.8-0.4,5.7-0.4,8.6c0,68.3,65.9,123.6,147.3,123.6
              S397,341.5,397,273.3c0-1.7-0.1-3.4-0.1-5.1C398.4,243.4,405.6,94.2,367.6,117.7z M193.4,320c-13.8,0-25-11.2-25-25s11.2-25,25-25
              s25,11.2,25,25S207.2,320,193.4,320z M306.5,320c-13.8,0-25-11.2-25-25s11.2-25,25-25s25,11.2,25,25S320.3,320,306.5,320z"/>
          </g>
    </svg>
  </>
}
export default Cat