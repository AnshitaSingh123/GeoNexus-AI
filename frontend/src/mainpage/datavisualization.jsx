import React, { useState } from 'react';

// Page Wrapper for consistent layout
const PageWrapper = ({ children, setPage }) => (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 md:py-12 transition-colors duration-300">
        <div className="container mx-auto px-6">
            <button onClick={() => setPage('home')} className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold mb-8 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to Home</span>
            </button>
            <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 animate-fade-in">
                {children}
            </main>
        </div>
    </div>
);

// Interactive Line Chart Component
const LineChart = () => {
    const [tooltip, setTooltip] = useState(null);
    const data = [
        { name: 'Jan', users: 400 }, { name: 'Feb', users: 300 },
        { name: 'Mar', users: 600 }, { name: 'Apr', users: 820 },
        { name: 'May', users: 500 }, { name: 'Jun', users: 700 },
    ];
    const width = 600;
    const height = 300;
    const padding = 40;

    const xScale = (i) => padding + i * (width - 2 * padding) / (data.length - 1);
    const yScale = (value) => height - padding - (value / 1000) * (height - 2 * padding);

    const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.users)}`).join(' ');

    const yAxisLabels = [0, 200, 400, 600, 800];

    return (
        <div className="relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                {/* Y-axis grid lines and labels */}
                {yAxisLabels.map(label => (
                    <g key={label}>
                        <line x1={padding} y1={yScale(label)} x2={width - padding} y2={yScale(label)} className="stroke-gray-200 dark:stroke-gray-700" strokeDasharray="4" />
                        <text x={padding - 10} y={yScale(label) + 5} textAnchor="end" className="text-xs fill-gray-500 dark:fill-gray-400">{label}</text>
                    </g>
                ))}

                {/* X-axis labels */}
                {data.map((d, i) => (
                    <text key={d.name} x={xScale(i)} y={height - padding + 20} textAnchor="middle" className="text-xs fill-gray-500 dark:fill-gray-400">{d.name}</text>
                ))}

                {/* Line path */}
                <path d={linePath} className="fill-none stroke-green-500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Data points and hover targets */}
                {data.map((d, i) => (
                    <g key={d.name}>
                        <circle cx={xScale(i)} cy={yScale(d.users)} r="5" className="fill-green-500" />
                        <circle 
                            cx={xScale(i)} cy={yScale(d.users)} r="15" 
                            className="fill-transparent cursor-pointer"
                            onMouseOver={() => setTooltip({ x: xScale(i), y: yScale(d.users), ...d })}
                            onMouseOut={() => setTooltip(null)}
                        />
                    </g>
                ))}
            </svg>
            {/* Tooltip */}
            {tooltip && (
                <div 
                    className="absolute p-2 text-xs text-white bg-gray-800 dark:bg-gray-900 rounded-md shadow-lg pointer-events-none transition-opacity"
                    style={{ left: tooltip.x, top: tooltip.y - 50, transform: 'translateX(-50%)' }}
                >
                    <div className="font-bold">{tooltip.name}</div>
                    <div>users: {tooltip.users}</div>
                </div>
            )}
        </div>
    );
};

// Interactive Pie Chart Component
const PieChart = () => {
    const [hoveredSlice, setHoveredSlice] = useState(null);
    const data = [
        { name: 'Land Products', value: 30, color: '#10B981' },
        { name: 'Ocean Products', value: 40, color: '#3B82F6' },
        { name: 'Atmospheric Products', value: 20, color: '#F97316' },
        { name: 'Climate Products', value: 10, color: '#F59E0B' },
    ];
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let cumulative = 0;

    const getPath = (value, isHovered) => {
        const startAngle = (cumulative / total) * 360;
        const endAngle = ((cumulative + value) / total) * 360;
        const radius = isHovered ? 55 : 50;
        const x1 = 50 + radius * Math.cos(Math.PI * startAngle / 180);
        const y1 = 50 + radius * Math.sin(Math.PI * startAngle / 180);
        const x2 = 50 + radius * Math.cos(Math.PI * endAngle / 180);
        const y2 = 50 + radius * Math.sin(Math.PI * endAngle / 180);
        const largeArcFlag = value / total > 0.5 ? 1 : 0;
        return `M 50,50 L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative w-52 h-52">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {data.map((item, index) => {
                        const path = getPath(item.value, hoveredSlice === index);
                        const currentCumulative = cumulative;
                        cumulative += item.value;
                        return (
                            <path 
                                key={index} 
                                d={path} 
                                fill={item.color}
                                onMouseOver={() => setHoveredSlice(index)}
                                onMouseOut={() => setHoveredSlice(null)}
                                className="cursor-pointer transition-all duration-200"
                            />
                        )
                    })}
                </svg>
                {hoveredSlice !== null && (
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{data[hoveredSlice].name}</div>
                            <div className="text-xl font-bold text-gray-800 dark:text-white">{data[hoveredSlice].value}%</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="space-y-3">
                {data.map((item, index) => (
                    <div key={item.name} className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-sm" style={{backgroundColor: item.color}}></div>
                        <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                        <span className="font-bold text-gray-800 dark:text-white">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Data Visualization Page Component
export default function DataVisualizationPage({ setPage }) {
    return (
        <PageWrapper title="Data Visualization" setPage={setPage}>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Data Analytics Dashboard</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Real-time insights into satellite data usage and portal statistics</p>
            </div>
            
            <div className="space-y-16">
                <div className="bg-gray-50/50 dark:bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-gray-700 dark:text-gray-200 mb-4">Monthly User Activity</h3>
                    <LineChart />
                </div>
                <div className="bg-gray-50/50 dark:bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-gray-700 dark:text-gray-200 mb-6 text-center">Product Type Distribution</h3>
                    <PieChart />
                </div>
            </div>
        </PageWrapper>
    );
}
