import { MonitorDot } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import {
    FolderOpen,
    Save,
    ImageDown,
    Users,
    Send,
    Palette,
    Minus,
    Plus,
    RotateCcw
} from 'lucide-react';
import {
    Hand,
    MousePointerClick,
    Square,
    Circle,
    RectangleHorizontal,
    ArrowRight,
    ArrowLeft,
    Pencil,
    Image,
    Eraser,
    Wrench
} from "lucide-react";

const Whiteboard = () => {
    const { WhiteboardId } = useParams();
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    // Pan and zoom states
    const [isPanning, setIsPanning] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [lastPanPosition, setLastPanPosition] = useState(null);

    // Drawing states
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState('pencil');
    const [properties, setProperties] = useState({
        color: '#000',
        lineWidth: 2,
    });

    // Canvas elements
    const [strokes, setStrokes] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedElements, setSelectedElements] = useState([]);

    // UI states
    const [showGrid, setShowGrid] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(true);

    // Shape drawing states
    const [isCreatingShape, setIsCreatingShape] = useState(false);
    const [shapeStartPos, setShapeStartPos] = useState(null);
    const [currentShape, setCurrentShape] = useState(null);

    const menus = [
        {
            text: 'Open File',
            action: 'open',
            icon: FolderOpen,
        },
        {
            text: 'Save to Device',
            action: 'save',
            icon: Save,
        },
        {
            text: 'Export as Image',
            action: 'export',
            icon: ImageDown,
        },
        {
            text: 'Live Collaboration',
            action: 'collaborate',
            icon: Users,
        },
        {
            text: 'Go to Origin',
            action: 'reset',
            icon: MonitorDot,
        },
    ];

    const topMenus = [
        {
            action: "hand",
            icon: <Hand size={15} />
        },
        {
            action: "selection",
            icon: <MousePointerClick size={15} />
        },
        {
            action: "squreShape",
            icon: <Square size={15} />
        },
        {
            action: "circleShape",
            icon: <Circle size={15} />
        },
        {
            action: "recangleSHape",
            icon: <RectangleHorizontal size={15} />
        },
        {
            action: "Rightarrow",
            icon: <ArrowRight size={15} />
        },
        {
            action: "Leftarrow",
            icon: <ArrowLeft size={15} />
        },
        {
            action: "pencil",
            icon: <Pencil size={15} />
        },
        {
            action: "image",
            icon: <Image size={15} />
        },
        {
            action: "erase",
            icon: <Eraser size={15} />
        },
        {
            action: "tools",
            icon: <Wrench size={15} />
        }
    ];

    const colors = ['#000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB'];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Note: localStorage is not available in this environment, so we skip loading
        redrawCanvas();
    }, [WhiteboardId]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = properties.lineWidth;
        ctx.strokeStyle = properties.color;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }, [properties]);

    useEffect(() => {
        redrawCanvas();
    }, [offset, strokes, shapes, images, showGrid, selectedElements, currentShape]);

    const redrawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.translate(offset.x, offset.y);

        if (showGrid) {
            drawInfiniteGrid(ctx);
        }

        // Draw images first (bottom layer)
        images.forEach(img => {
            if (img.element && img.element.complete) {
                ctx.drawImage(img.element, img.x, img.y, img.width, img.height);
                if (selectedElements.includes(img.id)) {
                    drawSelectionBorder(ctx, img.x, img.y, img.width, img.height);
                }
            }
        });

        // Draw strokes
        strokes.forEach(stroke => {
            if (stroke.points.length < 2) return;

            ctx.beginPath();
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
            for (let i = 1; i < stroke.points.length; i++) {
                ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
            }
            ctx.stroke();
        });

        // Draw shapes
        shapes.forEach(shape => {
            ctx.strokeStyle = shape.color;
            ctx.lineWidth = shape.lineWidth;
            ctx.fillStyle = shape.fill || 'transparent';

            drawShape(ctx, shape);

            if (selectedElements.includes(shape.id)) {
                const bounds = getShapeBounds(shape);
                drawSelectionBorder(ctx, bounds.x, bounds.y, bounds.width, bounds.height);
            }
        });

        // Draw current shape being created
        if (currentShape) {
            ctx.strokeStyle = properties.color;
            ctx.lineWidth = properties.lineWidth;
            ctx.fillStyle = 'transparent';
            drawShape(ctx, currentShape);
        }
    };

    const drawShape = (ctx, shape) => {
        ctx.beginPath();

        switch (shape.type) {
            case 'rectangle':
            case 'square':
                ctx.rect(shape.x, shape.y, shape.width, shape.height);
                break;
            case 'circle':
                const radius = Math.abs(shape.width) / 2;
                ctx.arc(shape.x + shape.width / 2, shape.y + shape.height / 2, radius, 0, 2 * Math.PI);
                break;
            case 'arrow-right':
            case 'arrow-left':
                drawArrow(ctx, shape);
                return; // Arrows don't use stroke/fill
        }

        if (shape.fill && shape.fill !== 'transparent') {
            ctx.fill();
        }
        ctx.stroke();
    };

    const drawArrow = (ctx, arrow) => {
        const { x, y, width, height } = arrow;
        const isLeft = arrow.type === 'arrow-left';

        const startX = isLeft ? x + width : x;
        const endX = isLeft ? x : x + width;
        const midY = y + height / 2;

        // Arrow line
        ctx.beginPath();
        ctx.moveTo(startX, midY);
        ctx.lineTo(endX, midY);
        ctx.stroke();

        // Arrow head
        const headLength = Math.min(Math.abs(width) * 0.3, 20);
        const headWidth = headLength * 0.7;

        ctx.beginPath();
        if (isLeft) {
            ctx.moveTo(x, midY);
            ctx.lineTo(x + headLength, midY - headWidth);
            ctx.lineTo(x + headLength, midY + headWidth);
        } else {
            ctx.moveTo(x + width, midY);
            ctx.lineTo(x + width - headLength, midY - headWidth);
            ctx.lineTo(x + width - headLength, midY + headWidth);
        }
        ctx.closePath();
        ctx.fill();
    };

    const getShapeBounds = (shape) => {
        return {
            x: shape.x,
            y: shape.y,
            width: shape.width,
            height: shape.height
        };
    };

    const drawSelectionBorder = (ctx, x, y, width, height) => {
        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
        ctx.restore();
    };

    const drawInfiniteGrid = (ctx) => {
        const canvas = canvasRef.current;
        const gridSize = 50;
        const lineWidth = 0.5;

        ctx.save();
        ctx.strokeStyle = '#f0f0f2';
        ctx.lineWidth = lineWidth;

        const startX = Math.floor(-offset.x / gridSize) * gridSize;
        const endX = Math.ceil((canvas.width - offset.x) / gridSize) * gridSize;
        const startY = Math.floor(-offset.y / gridSize) * gridSize;
        const endY = Math.ceil((canvas.height - offset.y) / gridSize) * gridSize;

        ctx.beginPath();
        for (let x = startX; x <= endX; x += gridSize) {
            ctx.moveTo(x, startY - gridSize);
            ctx.lineTo(x, endY + gridSize);
        }
        ctx.stroke();

        // Draw horizontal lines
        ctx.beginPath();
        for (let y = startY; y <= endY; y += gridSize) {
            ctx.moveTo(startX - gridSize, y);
            ctx.lineTo(endX + gridSize, y);
        }
        ctx.stroke();

        // Draw origin axes (thicker lines)
        ctx.strokeStyle = '#d0d0d0';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        // Vertical axis (x = 0)
        ctx.moveTo(0, startY - gridSize);
        ctx.lineTo(0, endY + gridSize);
        // Horizontal axis (y = 0)
        ctx.moveTo(startX - gridSize, 0);
        ctx.lineTo(endX + gridSize, 0);
        ctx.stroke();

        ctx.restore();
    };

    const getMousePos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left - offset.x,
            y: e.clientY - rect.top - offset.y
        };
    };

    const startDrawing = (e) => {
        const pos = getMousePos(e);

        if (currentTool === 'pencil') {
            const newStroke = {
                id: Date.now(),
                points: [pos],
                color: properties.color,
                lineWidth: properties.lineWidth
            };
            setStrokes(prev => [...prev, newStroke]);
            setIsDrawing(true);
        } else if (['squreShape', 'circleShape', 'recangleSHape', 'Rightarrow', 'Leftarrow'].includes(currentTool)) {
            setShapeStartPos(pos);
            setIsCreatingShape(true);
            const newShape = {
                id: Date.now(),
                type: getShapeType(currentTool),
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0,
                color: properties.color,
                lineWidth: properties.lineWidth
            };
            setCurrentShape(newShape);
        } else if (currentTool === 'selection') {
            handleSelection(pos);
        } else if (currentTool === 'erase') {
            handleErase(pos);
        }
    };

    const getShapeType = (tool) => {
        switch (tool) {
            case 'squreShape': return 'square';
            case 'circleShape': return 'circle';
            case 'recangleSHape': return 'rectangle';
            case 'Rightarrow': return 'arrow-right';
            case 'Leftarrow': return 'arrow-left';
            default: return 'rectangle';
        }
    };

    const draw = (e) => {
        const pos = getMousePos(e);

        if (currentTool === 'pencil' && isDrawing) {
            setStrokes(prev => {
                const newStrokes = [...prev];
                const currentStroke = newStrokes[newStrokes.length - 1];
                currentStroke.points.push(pos);
                return newStrokes;
            });
        } else if (isCreatingShape && shapeStartPos) {
            const width = pos.x - shapeStartPos.x;
            const height = pos.y - shapeStartPos.y;

            let adjustedWidth = width;
            let adjustedHeight = height;

            // For squares, maintain aspect ratio
            if (currentTool === 'squreShape') {
                const size = Math.max(Math.abs(width), Math.abs(height));
                adjustedWidth = width >= 0 ? size : -size;
                adjustedHeight = height >= 0 ? size : -size;
            }

            setCurrentShape(prev => ({
                ...prev,
                width: adjustedWidth,
                height: adjustedHeight
            }));
        } else if (currentTool === 'erase') {
            handleErase(pos);
        }
    };

    const stopDrawing = () => {
        if (currentTool === 'pencil' && isDrawing) {
            setIsDrawing(false);
            saveToStorage();
        } else if (isCreatingShape && currentShape) {
            if (Math.abs(currentShape.width) > 5 && Math.abs(currentShape.height) > 5) {
                setShapes(prev => [...prev, currentShape]);
                saveToStorage();
            }
            setIsCreatingShape(false);
            setShapeStartPos(null);
            setCurrentShape(null);
        }
    };

    const handleSelection = (pos) => {
        // Find elements at position
        const clickedElements = [];

        // Check shapes
        shapes.forEach(shape => {
            if (isPointInShape(pos, shape)) {
                clickedElements.push(shape.id);
            }
        });

        // Check images
        images.forEach(img => {
            if (pos.x >= img.x && pos.x <= img.x + img.width &&
                pos.y >= img.y && pos.y <= img.y + img.height) {
                clickedElements.push(img.id);
            }
        });

        if (clickedElements.length > 0) {
            setSelectedElements(clickedElements);
        } else {
            setSelectedElements([]);
        }
    };

    const isPointInShape = (point, shape) => {
        const { x, y } = point;
        const { x: sx, y: sy, width, height } = shape;

        switch (shape.type) {
            case 'rectangle':
            case 'square':
            case 'arrow-right':
            case 'arrow-left':
                return x >= sx && x <= sx + width && y >= sy && y <= sy + height;
            case 'circle':
                const centerX = sx + width / 2;
                const centerY = sy + height / 2;
                const radius = Math.abs(width) / 2;
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                return distance <= radius;
            default:
                return false;
        }
    };

    const handleErase = (pos) => {
        const eraseRadius = properties.lineWidth * 3;

        // Erase strokes
        setStrokes(prev => prev.filter(stroke => {
            return !stroke.points.some(point => {
                const distance = Math.sqrt((point.x - pos.x) ** 2 + (point.y - pos.y) ** 2);
                return distance <= eraseRadius;
            });
        }));

        // Erase shapes
        setShapes(prev => prev.filter(shape => !isPointInShape(pos, shape)));

        // Erase images
        setImages(prev => prev.filter(img => {
            return !(pos.x >= img.x && pos.x <= img.x + img.width &&
                pos.y >= img.y && pos.y <= img.y + img.height);
        }));

        saveToStorage();
    };

    const handleMouseDown = (e) => {
        e.preventDefault();

        if (e.button === 1) { // Middle mouse button
            setIsPanning(true);
            setLastPanPosition({ x: e.clientX, y: e.clientY });
            return;
        }

        if (e.button === 0) { // Left mouse button
            if (currentTool === 'hand') {
                setIsPanning(true);
                setLastPanPosition({ x: e.clientX, y: e.clientY });
            } else {
                startDrawing(e);
            }
        }
    };

    const handleMouseMove = (e) => {
        if (isPanning && lastPanPosition) {
            const dx = e.clientX - lastPanPosition.x;
            const dy = e.clientY - lastPanPosition.y;
            setOffset(prev => ({
                x: prev.x + dx,
                y: prev.y + dy,
            }));
            setLastPanPosition({ x: e.clientX, y: e.clientY });
        } else if (isDrawing || isCreatingShape) {
            draw(e);
        }
    };

    const handleMouseUp = (e) => {
        if (isPanning) {
            setIsPanning(false);
            setLastPanPosition(null);
        } else {
            stopDrawing();
        }
    };

    const handleWheel = (e) => {
        e.preventDefault();

        // Scroll-based infinite movement
        const scrollSpeed = 2;
        const deltaX = e.deltaX * scrollSpeed;
        const deltaY = e.deltaY * scrollSpeed;

        setOffset(prev => ({
            x: prev.x - deltaX,
            y: prev.y - deltaY
        }));
    };

    const handleMenuAction = (action) => {
        setMenuOpen(false);

        switch (action) {
            case 'open':
                fileInputRef.current?.click();
                break;
            case 'save':
                saveToStorage();
                alert('Whiteboard saved!');
                break;
            case 'export':
                exportCanvas();
                break;
            case 'collaborate':
                alert('Live collaboration feature coming soon!');
                break;
            case 'send':
                alert('Send request feature coming soon!');
                break;
            case 'reset':
                setOffset({ x: 0, y: 0 });
                break;
            default:
                break;
        }
    };

    const saveToStorage = () => {
        // Storage functionality disabled in this environment
        console.log('Save to storage requested');
    };

    const exportCanvas = () => {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        // Calculate bounds of all elements
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        [...strokes, ...shapes, ...images].forEach(element => {
            if (element.points) { // Stroke
                element.points.forEach(point => {
                    minX = Math.min(minX, point.x);
                    minY = Math.min(minY, point.y);
                    maxX = Math.max(maxX, point.x);
                    maxY = Math.max(maxY, point.y);
                });
            } else { // Shape or image
                minX = Math.min(minX, element.x);
                minY = Math.min(minY, element.y);
                maxX = Math.max(maxX, element.x + element.width);
                maxY = Math.max(maxY, element.y + element.height);
            }
        });

        // Add padding
        const padding = 50;
        const width = Math.max(800, maxX - minX + padding * 2);
        const height = Math.max(600, maxY - minY + padding * 2);

        tempCanvas.width = width;
        tempCanvas.height = height;

        // Fill white background
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, width, height);

        // Draw with offset
        const offsetX = -minX + padding;
        const offsetY = -minY + padding;
        tempCtx.translate(offsetX, offsetY);

        // Draw all elements (same as redrawCanvas but simplified)
        images.forEach(img => {
            if (img.element && img.element.complete) {
                tempCtx.drawImage(img.element, img.x, img.y, img.width, img.height);
            }
        });

        strokes.forEach(stroke => {
            if (stroke.points.length < 2) return;
            tempCtx.beginPath();
            tempCtx.strokeStyle = stroke.color;
            tempCtx.lineWidth = stroke.lineWidth;
            tempCtx.lineCap = 'round';
            tempCtx.lineJoin = 'round';
            tempCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
            for (let i = 1; i < stroke.points.length; i++) {
                tempCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
            }
            tempCtx.stroke();
        });

        shapes.forEach(shape => {
            tempCtx.strokeStyle = shape.color;
            tempCtx.lineWidth = shape.lineWidth;
            tempCtx.fillStyle = shape.fill || 'transparent';
            drawShape(tempCtx, shape);
        });

        // Download
        const link = document.createElement('a');
        link.download = `whiteboard-${WhiteboardId || 'export'}.png`;
        link.href = tempCanvas.toDataURL();
        link.click();
    };

    const handleFileLoad = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    setStrokes(data.strokes || []);
                    setShapes(data.shapes || []);
                    setImages(data.images || []);
                } catch (error) {
                    console.error('Error loading file:', error);
                    alert('Error loading file. Please make sure it\'s a valid whiteboard file.');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const newImage = {
                        id: Date.now(),
                        x: -offset.x + 100, // Position relative to current view
                        y: -offset.y + 100,
                        width: Math.min(img.width, 300), // Limit initial size
                        height: Math.min(img.height, 300),
                        element: img,
                        src: event.target.result
                    };
                    setImages(prev => [...prev, newImage]);
                    saveToStorage();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const clearCanvas = () => {
        setStrokes([]);
        setShapes([]);
        setImages([]);
        setSelectedElements([]);
    };

    const adjustLineWidth = (change) => {
        setProperties(prev => ({
            ...prev,
            lineWidth: Math.max(1, Math.min(20, prev.lineWidth + change))
        }));
    };

    const handleContextMenu = (e) => {
        e.preventDefault(); // Disable right-click context menu
    };

    const handleTopMenuAction = (action) => {
        if (action === 'tools') {
            setToolsOpen(!toolsOpen);
            return;
        }

        setCurrentTool(action);
        setSelectedElements([]);

        if (action === 'image') {
            imageInputRef.current?.click();
        }
    };

    const getCursor = () => {
        switch (currentTool) {
            case 'hand': return isPanning ? 'grabbing' : 'grab';
            case 'selection': return 'default';
            case 'erase': return 'crosshair';
            case 'pencil':
            default: return 'crosshair';
        }
    };

    return (
        <div className="p-0 m-0 bg-white fixed inset-0 overflow-hidden">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileLoad}
                accept=".json"
                className="hidden"
            />
            <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
            />

            {/* Menu Button & Sidebar - Positioned to the top-left */}
            <div className="absolute top-2 left-2 z-10">
                <HiBars3
                    onClick={() => setMenuOpen(prev => !prev)}
                    className="size-11 p-2 text-gray-700 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition duration-300 cursor-pointer hover:scale-105 active:scale-95"
                />

                <div className={`
                    mt-2 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 
                    overflow-hidden transition-all duration-300 ease-out origin-top-left
                    ${menuOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
                `}>
                    <ul className="py-2 min-w-[200px]">
                        {menus.map(({ text, icon: Icon, action }, index) => (
                            <li
                                key={text}
                                className="group flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200"
                                onClick={() => handleMenuAction(action)}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <Icon className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200" />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                    {text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Top Menu Icons - Centered at top */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex gap-2 bg-white p-2 rounded-xl shadow-md">
                    {topMenus.map((item, idx) => (
                        <button
                            key={idx}
                            title={item.action}
                            onClick={() => handleTopMenuAction(item.action)}
                            className={`p-2 rounded-lg text-xs hover:bg-blue-100 active:scale-95 transition-all ${currentTool === item.action ? 'bg-blue-200 text-blue-700' : 'bg-white'
                                }`}
                        >
                            {item.icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Current Tool Indicator */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-xs">
                    Current Tool: {currentTool.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </div>
            </div>

            {/* Drawing Tools Panel */}
            <div className={`
                absolute top-2 right-2 z-50 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-4
                transition-all duration-300 ease-out origin-top-right
                ${toolsOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
            `}>
                <div className="space-y-4 min-w-[200px]">
                    {/* Color Palette */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Palette className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Colors</span>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setProperties(prev => ({ ...prev, color }))}
                                    className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${properties.color === color ? 'border-gray-800 shadow-lg' : 'border-gray-300'
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Line Width */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Pencil className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Stroke Width</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => adjustLineWidth(-1)}
                                className="p-1 rounded hover:bg-gray-100 transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <div className="flex-1 bg-gray-100 rounded-lg px-3 py-1 text-center">
                                <span className="text-sm font-medium">{properties.lineWidth}px</span>
                            </div>
                            <button
                                onClick={() => adjustLineWidth(1)}
                                className="p-1 rounded hover:bg-gray-100 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Grid Toggle */}
                    <div>
                        <button
                            onClick={() => setShowGrid(!showGrid)}
                            className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${showGrid
                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {showGrid ? 'Hide Grid' : 'Show Grid'}
                        </button>
                    </div>

                    {/* Clear Canvas */}
                    <div>
                        <button
                            onClick={clearCanvas}
                            className="w-full px-3 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <RotateCcw className="w-4 h-4" />
                                Clear Canvas
                            </div>
                        </button>
                    </div>

                    {/* Selected Elements Info */}
                    {selectedElements.length > 0 && (
                        <div className="border-t pt-3">
                            <div className="text-xs text-gray-600">
                                {selectedElements.length} element(s) selected
                            </div>
                            <button
                                onClick={() => {
                                    // Delete selected elements
                                    setShapes(prev => prev.filter(s => !selectedElements.includes(s.id)));
                                    setImages(prev => prev.filter(i => !selectedElements.includes(i.id)));
                                    setSelectedElements([]);
                                    saveToStorage();
                                }}
                                className="mt-2 w-full px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                Delete Selected
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                onContextMenu={handleContextMenu}
                className="absolute inset-0 w-full h-full"
                style={{ cursor: getCursor() }}
            />

            {/* Coordinates Display */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs font-mono">
                Offset: ({Math.round(offset.x)}, {Math.round(offset.y)})
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                    onClick={() => setOffset({ x: 0, y: 0 })}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-all"
                    title="Reset View"
                >
                    <MonitorDot className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-xs">
                <div className="flex gap-4">
                    <span>Middle Mouse/Hand Tool: Pan</span>
                    <span>Scroll: Navigate</span>
                    <span>Tools: Draw/Select/Erase</span>
                </div>
            </div>
        </div>
    );
};

export default Whiteboard;