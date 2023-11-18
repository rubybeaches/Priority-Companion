"use client";

import { taskIconsProp, colorSchema, chronoType } from "../../lib/definitions";

const set = {
  circle: "#FFF",
  outline: "#5693FF",
  shape: "#427BDE",
  shapeInner: "#B1CEFF",
};

const selected = {
  circle: "#B1CEFF",
  outline: "#5693FF",
  shape: "#427BDE",
  shapeInner: "#FFF",
};

const unset = {
  circle: "#FFF",
  outline: "#FFF",
  shape: "#707070",
  shapeInner: "#F8F8F8",
};

export const TaskIcons = ({ icon, state, clickFunc }: taskIconsProp) => {
  const colors: any = {
    set: set,
    selected: selected,
    unset: unset,
  };

  const svg: any = {
    task: <TaskIcon fill={colors[state]} clickFunc={clickFunc} />,
    chart: <ChartIcon fill={colors[state]} clickFunc={clickFunc} />,
    calendar: <CalendarIcon fill={colors[state]} clickFunc={clickFunc} />,
    clock: <ClockIcon fill={colors[state]} clickFunc={clickFunc} />,
    square: <SquareIcon fill={colors[state]} clickFunc={clickFunc} />,
    link: <LinkIcon fill={colors[state]} clickFunc={clickFunc} />,
  };

  return svg[icon];
};

export default TaskIcons;

const TaskIcon = ({
  fill,
  clickFunc,
}: {
  fill: colorSchema;
  clickFunc: () => void;
}) => {
  return (
    <svg
      onClick={() => clickFunc()}
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 160 160"
    >
      <circle
        fill={fill.circle}
        id="Ellipse_926"
        data-name="Ellipse 926"
        cx="80"
        cy="80"
        r="80"
        transform="translate(0.44)"
      />
      <path
        fill={fill.outline}
        id="Ellipse_926_-_Outline"
        data-name="Ellipse 926 - Outline"
        d="M80,6.957A73.043,73.043,0,1,0,153.044,80,73.126,73.126,0,0,0,80,6.957M80,0A80,80,0,1,1,0,80,80,80,0,0,1,80,0Z"
      />
      <g
        id="Group_1808"
        data-name="Group 1808"
        transform="translate(48.694 41.738)"
      >
        <path
          fill={fill.shape}
          id="Path_794"
          data-name="Path 794"
          d="M19.37,66.578H-1.5V0H19.37Z"
          transform="translate(23.117 11.712)"
        />
        <path
          fill={fill.shape}
          id="Path_665"
          data-name="Path 665"
          d="M63.55,19.37H0V-1.5H63.55Z"
          transform="translate(0 1.5)"
        />
      </g>
    </svg>
  );
};

const ChartIcon = ({
  fill,
  clickFunc,
}: {
  fill: colorSchema;
  clickFunc: () => void;
}) => {
  return (
    <svg
      onClick={() => clickFunc()}
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 160 160"
    >
      <circle
        fill={fill.circle}
        id="Ellipse_926"
        data-name="Ellipse 926"
        cx="80"
        cy="80"
        r="80"
        transform="translate(0.44)"
      />
      <path
        fill={fill.outline}
        id="Ellipse_926_-_Outline"
        data-name="Ellipse 926 - Outline"
        d="M80,6.957A73.043,73.043,0,1,0,153.044,80,73.126,73.126,0,0,0,80,6.957M80,0A80,80,0,1,1,0,80,80,80,0,0,1,80,0Z"
      />
      <path
        fill={fill.shapeInner}
        id="Path_728"
        data-name="Path 728"
        d="M14273.2-7769.828c-.375-14.883,7.656-40.754,32.8-40.742s25.914,55.77,42.078,56.594c16.148.82,16.359-31.906,27.406-31.7s11.563,10.828,11.5,17.5"
        transform="translate(-14250.085 7862.269)"
      />
      <path
        fill={fill.shape}
        id="Path_728_-_Outline"
        data-name="Path 728 - Outline"
        d="M14351.688-7747.5c-.266,0-.539-.008-.8-.023-6.7-.34-10.5-6.98-11.75-9.168-2.641-4.609-4.859-10.574-7.2-16.883-5.32-14.312-11.352-30.531-22.953-30.539h-.016a25.223,25.223,0,0,0-18.75,7.633c-7.6,7.8-10.781,20.461-10.555,29.547l-6.953.176c-.25-9.777,2.883-24.7,12.531-34.578,6.3-6.457,14.281-9.73,23.727-9.73h.016c7.531,0,13.781,3.984,19.117,12.18,4.3,6.59,7.375,14.875,10.352,22.891,3.711,9.973,7.914,21.277,12.789,21.523.125.008.258.012.383.012,5.727,0,8.953-6.6,12.852-15.863,3.273-7.8,6.664-15.852,13.875-15.852h.18c6.227.113,10.742,3.031,13.047,8.434,1.711,4,1.906,8.6,1.867,12.57l-6.953-.062c.094-10.086-2.1-13.879-8.086-13.984h-.031c-2.617,0-5.2,6.152-7.484,11.59C14367.094-7758.645,14362.414-7747.508,14351.688-7747.5Z"
        transform="translate(-14253.07 7859.29)"
      />
    </svg>
  );
};

const CalendarIcon = ({
  fill,
  clickFunc,
}: {
  fill: colorSchema;
  clickFunc: () => void;
}) => {
  return (
    <svg
      onClick={() => clickFunc()}
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 160 160"
    >
      <circle
        fill={fill.circle}
        id="Ellipse_926"
        data-name="Ellipse 926"
        cx="80"
        cy="80"
        r="80"
        transform="translate(0.44)"
      />
      <path
        fill={fill.outline}
        id="Ellipse_926_-_Outline"
        data-name="Ellipse 926 - Outline"
        d="M80,6.957A73.043,73.043,0,1,0,153.044,80,73.126,73.126,0,0,0,80,6.957M80,0A80,80,0,1,1,0,80,80,80,0,0,1,80,0Z"
      />
      <rect
        fill={fill.shapeInner}
        id="Rectangle_3616"
        data-name="Rectangle 3616"
        width="97.022"
        height="87.801"
        transform="translate(31.489 40.516)"
      />
      <g fill={fill.shape} id="Group_1811" data-name="Group 1811">
        <path
          id="Rectangle_3616_-_Outline"
          data-name="Rectangle 3616 - Outline"
          d="M6.969,6.937V80.864H90.053V6.937H6.969M0,0H97.022V87.8H0Z"
          transform="translate(31.489 40.516)"
        />
        <path
          id="Path_800"
          data-name="Path 800"
          d="M0,0H17.56V17.56H0Z"
          transform="translate(44.798 93.238)"
        />
        <path
          id="Path_797"
          data-name="Path 797"
          d="M0,0H17.56V17.56H0Z"
          transform="translate(71.22 66.816)"
        />
        <path
          id="Path_799"
          data-name="Path 799"
          d="M0,0H17.56V17.56H0Z"
          transform="translate(71.22 93.238)"
        />
        <path
          id="Path_796"
          data-name="Path 796"
          d="M0,0H17.56V17.56H0Z"
          transform="translate(97.642 66.816)"
        />
        <path
          id="Path_798"
          data-name="Path 798"
          d="M0,0H17.56V17.56H0Z"
          transform="translate(97.642 93.238)"
        />
        <path
          id="Path_801"
          data-name="Path 801"
          d="M6.969,0H90.053a6.953,6.953,0,0,1,6.969,6.937v3.685a6.953,6.953,0,0,1-6.969,6.937H6.969A6.953,6.953,0,0,1,0,10.623V6.937A6.953,6.953,0,0,1,6.969,0Z"
          transform="translate(31.489 40.394)"
        />
        <path
          id="Path_803"
          data-name="Path 803"
          d="M4.291,0A4.291,4.291,0,0,1,8.583,4.291v8.978a4.291,4.291,0,0,1-8.583,0V4.291A4.291,4.291,0,0,1,4.291,0Z"
          transform="translate(44.79 31.587)"
        />
        <path
          id="Path_802"
          data-name="Path 802"
          d="M4.39,0A4.39,4.39,0,0,1,8.78,4.39v8.78a4.39,4.39,0,0,1-8.78,0V4.39A4.39,4.39,0,0,1,4.39,0Z"
          transform="translate(106.43 31.587)"
        />
      </g>
      <g fill={fill.circle} id="Group_1812" data-name="Group 1812">
        <path
          id="Path_803_-_Outline"
          data-name="Path 803 - Outline"
          d="M7.76,3.469A4.291,4.291,0,0,0,3.469,7.76v8.978a4.291,4.291,0,0,0,8.583,0V7.76A4.291,4.291,0,0,0,7.76,3.469M7.76,0a7.769,7.769,0,0,1,7.76,7.76v8.978a7.76,7.76,0,0,1-15.52,0V7.76A7.769,7.769,0,0,1,7.76,0Z"
          transform="translate(41.316 28.112)"
        />
        <path
          id="Path_802_-_Outline"
          data-name="Path 802 - Outline"
          d="M7.859,3.469a4.39,4.39,0,0,0-4.39,4.39v8.78a4.39,4.39,0,1,0,8.78,0V7.859a4.39,4.39,0,0,0-4.39-4.39M7.859,0a7.868,7.868,0,0,1,7.859,7.859v8.78A7.859,7.859,0,0,1,0,16.639V7.859A7.868,7.868,0,0,1,7.859,0Z"
          transform="translate(102.966 28.112)"
        />
      </g>
    </svg>
  );
};

const ClockIcon = ({
  fill,
  clickFunc,
}: {
  fill: colorSchema;
  clickFunc: () => void;
}) => {
  return (
    <svg
      onClick={() => clickFunc()}
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 160 160"
    >
      <circle
        fill={fill.circle}
        id="Ellipse_926"
        data-name="Ellipse 926"
        cx="80"
        cy="80"
        r="80"
        transform="translate(0.44)"
      />
      <path
        fill={fill.outline}
        id="Ellipse_926_-_Outline"
        data-name="Ellipse 926 - Outline"
        d="M80,6.957A73.043,73.043,0,1,0,153.044,80,73.126,73.126,0,0,0,80,6.957M80,0A80,80,0,1,1,0,80,80,80,0,0,1,80,0Z"
      />
      <path
        fill={fill.shapeInner}
        id="Path_795"
        data-name="Path 795"
        d="M57.645,0A57.645,57.645,0,1,1,0,57.645,57.645,57.645,0,0,1,57.645,0Z"
        transform="translate(22.354 22.357)"
      />
      <g fill={fill.shape} id="Group_1810" data-name="Group 1810">
        <path
          id="Ellipse_930_-_Outline"
          data-name="Ellipse 930 - Outline"
          d="M57.645,6.957a50.689,50.689,0,1,0,50.689,50.689A50.746,50.746,0,0,0,57.645,6.957m0-6.957A57.645,57.645,0,1,1,0,57.645,57.645,57.645,0,0,1,57.645,0Z"
          transform="translate(22.354 22.357)"
        />
        <path
          id="Line_366"
          data-name="Line 366"
          d="M5.244,35.55A3.478,3.478,0,0,1,1.78,32.342L-.489,3.249a3.478,3.478,0,0,1,6.935-.541L8.715,31.8a3.478,3.478,0,0,1-3.2,3.738Q5.38,35.55,5.244,35.55Z"
          transform="translate(74.752 52.358)"
        />
        <path
          id="Path_665"
          data-name="Path 665"
          d="M24.9,6.457H2.978a3.478,3.478,0,0,1,0-6.957H24.9a3.478,3.478,0,1,1,0,6.957Z"
          transform="translate(76.492 77.025)"
        />
        <path
          id="Path_794"
          data-name="Path 794"
          d="M8.869,0A8.869,8.869,0,1,1,0,8.869,8.869,8.869,0,0,1,8.869,0Z"
          transform="translate(71.131 71.135)"
        />
        <path
          id="Line_424"
          data-name="Line 424"
          d="M6.457,13.913H-.5V0H6.457Z"
          transform="translate(76.611 24.504)"
        />
        <path
          id="Line_425"
          data-name="Line 425"
          d="M13.913,6.457H0V-.5H13.913Z"
          transform="translate(117.85 77.178)"
        />
        <path
          id="Line_426"
          data-name="Line 426"
          d="M6.457,13.913H-.5V0H6.457Z"
          transform="translate(76.611 118.417)"
        />
        <path
          id="Line_427"
          data-name="Line 427"
          d="M13.913,6.457H0V-.5H13.913Z"
          transform="translate(27.415 77.178)"
        />
        <path
          id="Line_428"
          data-name="Line 428"
          d="M6.6,11.522-.354,4.565,4.565-.354,11.522,6.6Z"
          transform="translate(35.744 46.271)"
        />
        <path
          id="Line_429"
          data-name="Line 429"
          d="M4.565,11.522-.354,6.6,6.6-.354l4.919,4.919Z"
          transform="translate(112.266 46.271)"
        />
        <path
          id="Line_430"
          data-name="Line 430"
          d="M4.565,11.522-.354,6.6,6.6-.354l4.919,4.919Z"
          transform="translate(42.701 109.355)"
        />
        <path
          id="Line_431"
          data-name="Line 431"
          d="M6.6,11.522-.354,4.565,4.565-.354,11.522,6.6Z"
          transform="translate(105.309 109.355)"
        />
      </g>
    </svg>
  );
};

const SquareIcon = ({
  fill,
  clickFunc,
}: {
  fill: colorSchema;
  clickFunc: () => void;
}) => {
  return (
    <svg
      onClick={() => clickFunc()}
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 160 160"
    >
      <circle
        fill={fill.circle}
        id="Ellipse_926"
        data-name="Ellipse 926"
        cx="80"
        cy="80"
        r="80"
        transform="translate(0.44)"
      />
      <path
        fill={fill.outline}
        id="Ellipse_926_-_Outline"
        data-name="Ellipse 926 - Outline"
        d="M80,6.957A73.043,73.043,0,1,0,153.044,80,73.126,73.126,0,0,0,80,6.957M80,0A80,80,0,1,1,0,80,80,80,0,0,1,80,0Z"
      />
      <rect
        fill={fill.shapeInner}
        id="Rectangle_3658"
        data-name="Rectangle 3658"
        width="89.87"
        height="89.87"
        transform="translate(34.646 32.595)"
      />
      <g fill={fill.shape} id="Group_1809" data-name="Group 1809">
        <path
          id="Rectangle_3658_-_Outline"
          data-name="Rectangle 3658 - Outline"
          d="M6.957,6.957V82.913H82.914V6.957H6.957M0,0H89.87V89.87H0Z"
          transform="translate(34.646 32.595)"
        />
        <path
          id="Line_389"
          data-name="Line 389"
          d="M6.457,83.478H-.5V0H6.457Z"
          transform="translate(77.021 38.261)"
        />
        <path
          id="Path_794"
          data-name="Path 794"
          d="M83.478,6.457H0V-.5H83.478Z"
          transform="translate(38.261 77.022)"
        />
      </g>
    </svg>
  );
};

const LinkIcon = ({
  fill,
  clickFunc,
}: {
  fill: colorSchema;
  clickFunc: () => void;
}) => {
  return (
    <svg
      onClick={() => clickFunc()}
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 160 160"
    >
      <circle
        fill={fill.circle}
        id="Ellipse_926"
        data-name="Ellipse 926"
        cx="80"
        cy="80"
        r="80"
        transform="translate(0.44)"
      />
      <path
        fill={fill.outline}
        id="Ellipse_926_-_Outline"
        data-name="Ellipse 926 - Outline"
        d="M80,6.957A73.043,73.043,0,1,0,153.044,80,73.126,73.126,0,0,0,80,6.957M80,0A80,80,0,1,1,0,80,80,80,0,0,1,80,0Z"
      />
      <g fill={fill.shapeInner} id="Group_1814" data-name="Group 1814">
        <path
          id="Path_805"
          data-name="Path 805"
          d="M20.425,0A20.425,20.425,0,0,1,40.85,20.425V57.19A20.425,20.425,0,0,1,0,57.19V20.425A20.425,20.425,0,0,1,20.425,0Z"
          transform="translate(114.857 25.367) rotate(51)"
        />
        <path
          id="Path_804"
          data-name="Path 804"
          d="M20.425,0A20.425,20.425,0,0,1,40.85,20.425V57.19A20.425,20.425,0,0,1,0,57.19V20.425A20.425,20.425,0,0,1,20.425,0Z"
          transform="translate(73.587 58.791) rotate(51)"
        />
      </g>
      <g fill={fill.shape} id="Group_1813" data-name="Group 1813">
        <path
          id="Rectangle_3659_-_Outline"
          data-name="Rectangle 3659 - Outline"
          d="M20.425,6.957A13.484,13.484,0,0,0,6.957,20.425V57.19a13.468,13.468,0,1,0,26.937,0V20.425A13.484,13.484,0,0,0,20.425,6.957m0-6.957A20.425,20.425,0,0,1,40.85,20.425V57.19A20.425,20.425,0,1,1,0,57.19V20.425A20.425,20.425,0,0,1,20.425,0Z"
          transform="translate(114.857 25.367) rotate(51)"
        />
        <path
          id="Rectangle_3657_-_Outline"
          data-name="Rectangle 3657 - Outline"
          d="M20.425,6.957A13.484,13.484,0,0,0,6.957,20.425V57.19a13.468,13.468,0,1,0,26.937,0V20.425A13.484,13.484,0,0,0,20.425,6.957m0-6.957A20.425,20.425,0,0,1,40.85,20.425V57.19A20.425,20.425,0,1,1,0,57.19V20.425A20.425,20.425,0,0,1,20.425,0Z"
          transform="translate(73.587 58.791) rotate(51)"
        />
      </g>
    </svg>
  );
};