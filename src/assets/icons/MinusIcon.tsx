import { SVGProps } from "react";
const MinusIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        style={{
            fill: "#000",
        }}
        {...props}
    >
        <path d='M5 11h14v2H5z' />
    </svg>
);
export default MinusIcon;
