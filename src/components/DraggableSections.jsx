import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay
} from '@dnd-kit/core'
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  useSortable, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'

function SortableItem({ id, title }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : 0
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`p-4 mb-3 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-between transition-all duration-200
        ${isDragging ? 'border-blue-500 shadow-md bg-blue-50' : 'hover:border-gray-200 hover:shadow'}`}
    >
      <div className="flex items-center">
        <div 
          {...attributes} 
          {...listeners}
          className="mr-3 text-gray-400 cursor-grab hover:text-blue-600 active:cursor-grabbing"
        >
          <FaBars />
        </div>
        <span className="font-medium text-gray-800">{title}</span>
      </div>
      <div className="text-xs bg-gray-100 text-gray-500 py-1 px-2.5 rounded-full font-medium">
        Drag to reorder
      </div>
    </div>
  )
}

function DraggableItem({ title }) {
  return (
    <div className="p-4 mb-3 bg-blue-50 rounded-lg shadow-md border border-blue-500 flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-3 text-blue-500">
          <FaBars />
        </div>
        <span className="font-medium text-blue-900">{title}</span>
      </div>
      <div className="text-xs bg-blue-200 text-blue-800 py-1 px-2.5 rounded-full font-medium">
        Moving
      </div>
    </div>
  )
}

function DraggableSections({ sections, onSectionOrderChange }) {
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(section => section.id === active.id)
      const newIndex = sections.findIndex(section => section.id === over.id)

      const newOrder = arrayMove(sections, oldIndex, newIndex)
      onSectionOrderChange(newOrder)
    }
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const getActiveItem = () => {
    if (!activeId) return null
    const activeItem = sections.find(section => section.id === activeId)
    return activeItem ? activeItem.title : ''
  }

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Reorder Resume Sections</h2>
      <p className="text-gray-600 mb-4">Drag and drop sections to change their order in your resume.</p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext 
          items={sections.map(section => section.id)} 
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sections.map(section => (
              <SortableItem 
                key={section.id} 
                id={section.id} 
                title={section.title} 
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? <DraggableItem title={getActiveItem()} /> : null}
        </DragOverlay>
      </DndContext>

      <div className="mt-6 text-sm text-gray-500 p-3 bg-blue-50 rounded-md">
        <p className="font-medium text-blue-700 mb-1">How to reorder sections:</p>
        <ol className="list-decimal list-inside space-y-1 text-gray-600">
          <li>Click and hold the drag handle (≡) next to any section</li>
          <li>Drag the section up or down to its new position</li>
          <li>Release to drop the section in its new place</li>
        </ol>
      </div>
    </div>
  )
}

export default DraggableSections