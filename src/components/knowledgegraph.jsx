import React, { useState } from 'react';

// ICONS (re-used for consistency)
const KnowledgeGraphIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-10 w-10 animate-fade-in"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
        <path d="M19 14h-2v-2h-2v2h-2v2h2v2h2v-2h2v-2zm-9-4c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
    </svg>
);

// Page Wrapper for consistent layout
const PageWrapper = ({ children, setPage }) => (
    <div className="relative bg-gray-50 dark:bg-gray-900 min-h-screen py-8 md:py-12 transition-colors duration-300 overflow-hidden">
        {/* Bubble Background Animation */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-300 dark:bg-blue-800 rounded-full opacity-30 blur-3xl animate-pulse-slow" />
            <div className="absolute top-1/2 left-2/3 w-64 h-64 bg-pink-300 dark:bg-pink-800 rounded-full opacity-20 blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-green-300 dark:bg-green-800 rounded-full opacity-30 blur-3xl animate-float-alt" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <button onClick={() => setPage('home')} className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold mb-8 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to Home</span>
            </button>
            <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
                {children}
            </main>
        </div>
    </div>
);

// The main Knowledge Graph Page Component
export default function KnowledgeGraphPage({ setPage }) {
    const nodes = [
        { id: 'Cartosat-3', x: 250, y: 150, color: '#4F46E5', type: 'Satellite' },
        { id: 'RISAT-2B', x: 350, y: 300, color: '#4F46E5', type: 'Satellite' },
        { id: 'Earth Obs', x: 400, y: 200, color: '#8B5CF6', type: 'Mission' },
        { id: 'India', x: 200, y: 250, color: '#DB2777', type: 'Location' },
        { id: 'HR Imagery', x: 550, y: 150, color: '#F59E0B', type: 'Data' },
        { id: 'SAR Data', x: 500, y: 280, color: '#10B981', type: 'Data' },
    ];
    const links = [
        { source: 'Cartosat-3', target: 'Earth Obs' },
        { source: 'RISAT-2B', target: 'Earth Obs' },
        { source: 'Cartosat-3', target: 'India' },
        { source: 'RISAT-2B', target: 'India' },
        { source: 'Earth Obs', target: 'HR Imagery' },
        { source: 'Earth Obs', target: 'SAR Data' },
        { source: 'Cartosat-3', target: 'HR Imagery' },
        { source: 'RISAT-2B', target: 'SAR Data' },
    ];
    const nodeMap = nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {});

    const legend = [
        { name: 'Cartosat-3', type: 'Satellite', color: '#4F46E5' },
        { name: 'Earth Observation', type: 'Mission', color: '#8B5CF6' },
        { name: 'High Resolution Imagery', type: 'Data', color: '#F59E0B' },
        { name: 'India', type: 'Location', color: '#DB2777' },
        { name: 'RISAT-2B', type: 'Satellite', color: '#4F46E5' },
        { name: 'Optical Data', type: 'Data', color: '#10B981' },
    ];

    return (
        <PageWrapper title="Knowledge Graph" setPage={setPage}>
            <div className="flex justify-between items-center mb-6 animate-fade-in">
                <div className="flex items-center space-x-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg animate-bounce">
                        <KnowledgeGraphIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Knowledge Graph Explorer</h2>
                </div>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                    </svg>
                </button>
            </div>

            <div className="flex items-center space-x-4 mb-6 animate-fade-in">
                <div className="relative flex-grow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    <input type="text" placeholder="Search entities..." className="w-full bg-gray-100 dark:bg-gray-700/50 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg py-3 pl-12 pr-4 text-gray-800 dark:text-gray-200 transition-colors" />
                </div>
                <div className="relative">
                    <select className="appearance-none w-48 bg-gray-100 dark:bg-gray-700/50 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg py-3 pl-4 pr-10 text-gray-800 dark:text-gray-200 transition-colors">
                        <option>All Types</option>
                        <option>Satellite</option>
                        <option>Mission</option>
                        <option>Data</option>
                        <option>Location</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 h-[50vh] flex items-center justify-center bg-gray-50 dark:bg-gray-800/30 animate-fade-in">
                <svg viewBox="0 0 800 400" className="w-full h-full">
                    <g>
                        {links.map((link, i) => (
                            <line
                                key={i}
                                x1={nodeMap[link.source].x}
                                y1={nodeMap[link.source].y}
                                x2={nodeMap[link.target].x}
                                y2={nodeMap[link.target].y}
                                className="stroke-gray-300 dark:stroke-gray-600"
                                strokeWidth="1.5"
                            />
                        ))}
                    </g>
                    <g>
                        {nodes.map(node => (
                            <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="cursor-pointer group">
                                <circle r="25" fill={node.color} className="transition-transform duration-300 ease-in-out group-hover:scale-110" />
                                <text textAnchor="middle" dy="5" fill="white" className="font-semibold text-xs select-none pointer-events-none group-hover:opacity-90">
                                    {node.id}
                                </text>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {legend.map(item => (
                        <div key={item.name} className="flex items-center space-x-3 hover:scale-105 transition-transform">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item.name}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">{item.type}</span>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
}
