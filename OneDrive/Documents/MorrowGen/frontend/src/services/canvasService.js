import * as fabric from 'fabric';

class CanvasService {
    constructor() {
        this.canvas = null;
        this.selectedCanvaShape = null;
        this.currentTool = 'pencil';
        this.isDrawing = false;
        this.properties = {
            stroke: '#000',
            strokeWidth: 2,
            fill: 'transparent'
        };
    }

    setCanvas(canvasInstance) {
        this.canvas = canvasInstance;
        this.setupCanvas();
    }

    setupCanvas() {
        if (!this.canvas) return;
        
        // Initialize free drawing mode first to create the brush
        this.canvas.isDrawingMode = true;
        
        // Now safely set brush properties
        if (this.canvas.freeDrawingBrush) {
            this.canvas.freeDrawingBrush.width = this.properties.strokeWidth;
            this.canvas.freeDrawingBrush.color = this.properties.stroke;
        }
        
        this.setTool('pencil');
    }

    setTool(tool) {
        if (!this.canvas) return;
        
        this.currentTool = tool;
        
        switch (tool) {
            
            case 'pencil':
                console.log("prining");
                this.canvas.isDrawingMode = true;
                this.canvas.selection = false;
                // Ensure brush properties are applied
                if (this.canvas.freeDrawingBrush) {
                    this.canvas.freeDrawingBrush.width = this.properties.strokeWidth;
                    this.canvas.freeDrawingBrush.color = this.properties.stroke;
                }
                break;
            case 'selection':
                this.canvas.isDrawingMode = false;
                this.canvas.selection = true;
                break;
            case 'hand':
                this.canvas.isDrawingMode = false;
                this.canvas.selection = false;
                break;
            case 'erase':
                // Simple eraser implementation
                this.canvas.isDrawingMode = false;
                this.canvas.selection = true;
                break;
            default:
                this.canvas.isDrawingMode = false;
                this.canvas.selection = true;
        }
    }

    addShape(shapeType) {
        if (!this.canvas) return;

        let shape;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        switch (shapeType) {
            case 'square':
                shape = new fabric.Rect({
                    left: centerX - 50,
                    top: centerY - 50,
                    width: 100,
                    height: 100,
                    fill: this.properties.fill,
                    stroke: this.properties.stroke,
                    strokeWidth: this.properties.strokeWidth
                });
                break;
            case 'circle':
                shape = new fabric.Circle({
                    left: centerX - 50,
                    top: centerY - 50,
                    radius: 50,
                    fill: this.properties.fill,
                    stroke: this.properties.stroke,
                    strokeWidth: this.properties.strokeWidth
                });
                break;
            case 'rectangle':
                shape = new fabric.Rect({
                    left: centerX - 75,
                    top: centerY - 37.5,
                    width: 150,
                    height: 75,
                    fill: this.properties.fill,
                    stroke: this.properties.stroke,
                    strokeWidth: this.properties.strokeWidth
                });
                break;
        }

        if (shape) {
            this.canvas.add(shape);
            this.canvas.setActiveObject(shape);
            this.canvas.renderAll();
            // Switch to selection tool after adding shape
            this.setTool('selection');
        }
    }

    addArrow(direction) {
        if (!this.canvas) return;

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Create arrow using path
        const arrowPath = direction === 'right' 
            ? 'M 0 0 L 80 0 M 60 -10 L 80 0 L 60 10'
            : 'M 80 0 L 0 0 M 20 -10 L 0 0 L 20 10';
            
        const arrow = new fabric.Path(arrowPath, {
            left: centerX - 40,
            top: centerY - 5,
            stroke: this.properties.stroke,
            strokeWidth: this.properties.strokeWidth,
            fill: ''
        });

        this.canvas.add(arrow);
        this.canvas.setActiveObject(arrow);
        this.canvas.renderAll();
        // Switch to selection tool after adding arrow
        this.setTool('selection');
    }

    updateBrushProperties(properties) {
        // Map component properties to service properties
        if (properties.color !== undefined) {
            this.properties.stroke = properties.color;
        }
        if (properties.lineWidth !== undefined) {
            this.properties.strokeWidth = properties.lineWidth;
        }
        if (properties.fill !== undefined) {
            this.properties.fill = properties.fill;
        }
        
        // Update brush properties if canvas exists
        if (this.canvas && this.canvas.freeDrawingBrush) {
            this.canvas.freeDrawingBrush.width = this.properties.strokeWidth;
            this.canvas.freeDrawingBrush.color = this.properties.stroke;
        }
    }

    deleteSelected() {
        if (!this.canvas) return;
        
        const activeObjects = this.canvas.getActiveObjects();
        if (activeObjects.length > 0) {
            activeObjects.forEach(obj => this.canvas.remove(obj));
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
        }
    }

    clear() {
        if (!this.canvas) return;
        this.canvas.clear();
        this.canvas.renderAll();
    }

    exportAsImage() {
        if (!this.canvas) return null;
        return this.canvas.toDataURL({
            format: 'png',
            quality: 1
        });
    }
}

export const canvasServiceInstance = new CanvasService();