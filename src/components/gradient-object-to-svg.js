export default function GradientObjectToSvg(gradientObject) {

    //save from object to string before writing out
    const svgString = `<!-- nti-linear-gradient --><svg xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="Gradient" gradientTransform="rotate(0)" viewBox="0 0 10 1">${printStops(gradientObject)}<linearGradient></defs><rect x="0" y="0" height="100%" width="100%"  fill="url(#Gradient)" /></svg>`;

        return svgString;
    }

    const printStops = (gradientObject) => {
        let s = '';
        gradientObject.stops.map((lg) => {
            s += (`<stop offset="${lg.offset}" stopColor="${lg.stopcolor}"/>`);
        });
        return s;
    }
