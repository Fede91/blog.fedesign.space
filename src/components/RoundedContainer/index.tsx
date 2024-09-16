"use client";
import React, { useRef, useEffect, useState } from "react";
import "./style.css";

type Props = {
  radius?: number;
  fill?: string;
  stroke?: string;
  style?: React.CSSProperties;
  variant?: "card" | "slideshow";
};

const RoundedContainer: React.FC<Props> = (props) => {
  const { radius = 20, fill, stroke, variant = "card" } = props;

  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    if (ref.current) {
      setDimensions({
        width: (ref.current as HTMLElement).offsetWidth,
        height: (ref.current as HTMLElement).offsetHeight,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    setTimeout(() => {
      handleResize();
    }, 10);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <div className="rounded_slide-tile__wrapper" ref={ref}>
      {variant === "card" ? (
        <div className="rounded-tile__wrapper" ref={ref}>
          <svg
            width={dimensions.width}
            height={dimensions.height}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={`M0 ${radius}
                C0 9 9 0 ${radius} 0
                L${dimensions.width - radius} 0
                C${dimensions.width - radius / 2} 0 ${dimensions.width} 9 ${
                dimensions.width
              } ${radius}
                V${dimensions.height - radius * 4}
                C${dimensions.width} ${
                dimensions.height - radius * 3 - radius / 2
              } ${dimensions.width - radius / 2} ${
                dimensions.height - radius * 3
              } ${dimensions.width - radius} ${dimensions.height - radius * 3}
                L${dimensions.width - radius * 2} ${
                dimensions.height - radius * 3
              }
                C${dimensions.width - radius * 2 - radius / 2} ${
                dimensions.height - radius * 3
              } ${dimensions.width - radius * 3} ${
                dimensions.height - radius * 2 - radius / 2
              } ${dimensions.width - radius * 3} ${
                dimensions.height - radius * 2
              }
                V${dimensions.height - radius}
                C${dimensions.width - radius * 3} ${
                dimensions.height - radius / 2
              } ${dimensions.width - radius * 3 - radius / 2} ${
                dimensions.height
              } ${dimensions.width - radius * 4} ${dimensions.height}
                H${radius}
                C9 ${dimensions.height} 0 ${dimensions.height - radius / 2} 0 ${
                dimensions.height - radius
              }
                V${radius}
                Z`}
              fill={fill}
              stroke={stroke}
            />
          </svg>
        </div>
      ) : variant === "slideshow" ? (
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="shape-slideshow">
              <path
                d={`M${radius * 5} ${radius * 3}
                    C${radius * 5 + radius / 2} ${radius * 3} ${radius * 6} ${
                  radius * 2 + radius / 2
                } ${radius * 6} ${radius * 2}
                    V${radius}
                    C${radius * 6} ${radius / 2} ${radius * 6 + radius / 2} 0 ${
                  radius * 7
                } 0
                    L${dimensions.width - radius} 0
                    C${dimensions.width - radius / 2} 0 ${dimensions.width} 9 ${
                  dimensions.width
                } ${radius}
                    V${dimensions.height - radius * 4}
                    C${dimensions.width} ${
                  dimensions.height - radius * 3 - radius / 2
                } ${dimensions.width - radius / 2} ${
                  dimensions.height - radius * 3
                } ${dimensions.width - radius} ${dimensions.height - radius * 3}
                    L${dimensions.width - radius * 2} ${
                  dimensions.height - radius * 3
                }
                    C${dimensions.width - radius * 2 - radius / 2} ${
                  dimensions.height - radius * 3
                } ${dimensions.width - radius * 3} ${
                  dimensions.height - radius * 2 - radius / 2
                } ${dimensions.width - radius * 3} ${
                  dimensions.height - radius * 2
                }
                    V${dimensions.height - radius}
                    C${dimensions.width - radius * 3} ${
                  dimensions.height - radius / 2
                } ${dimensions.width - radius * 3 - radius / 2} ${
                  dimensions.height
                } ${dimensions.width - radius * 4} ${dimensions.height}
                    H${radius}
                    C${radius / 2} ${dimensions.height} 0 ${
                  dimensions.height - radius / 2
                } 0 ${dimensions.height - radius}
                    V${radius * 4}
                    C0 ${radius * 3 + radius / 2} ${radius / 2} ${
                  radius * 3
                } ${radius} ${radius * 3}
                    H${radius * 5}
                    Z`}
                fill={fill}
                stroke={stroke}
              />
              <circle
                cx={radius + radius / 2}
                cy={radius + radius / 2}
                r="24"
                fill={fill}
              />
              <circle
                cx={radius * 4 + radius / 2}
                cy={radius + radius / 2}
                r="24"
                fill={fill}
              />
              <circle
                cx={dimensions.width - radius - radius / 2}
                cy={dimensions.height - radius - radius / 2}
                r="24"
                fill={fill}
              />
            </clipPath>
          </defs>
        </svg>
      ) : null}
    </div>
  );
};

export default RoundedContainer;
