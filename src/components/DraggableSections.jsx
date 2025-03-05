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
        ${isDragging ? 'border-blue-500 shadow-md bg-blue-50 scale-102' : 'hover:border-gray-200 hover:shadow'}`}
    >
      <div className="flex items-center">
        <div 
          {...attributes} 
          {...listeners}
          className="mr-3 text-gray-400 cursor-grab hover:text-blue-600 active:cursor-grabbing p-2 rounded-md hover:bg-gray-100 transition-colors"
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
    <div className="p-4 mb-3 bg-blue-50 rounded-lg shadow-md border border-blue-500 flex items-center justify-between animate-pulse">
      <div className="flex items-center">
        <div className="mr-3 text-blue-500 p-2 rounded-md bg-blue-100">
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
      // Reduce the activation constraint to make dragging more responsive
      activationConstraint: {
        distance: 1,
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
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <FaBars />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reorder Sections</h2>
          <p className="text-gray-600 text-sm">Arrange sections to customize your resume layout</p>
        </div>
      </div>
      
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
          <div className="space-y-1 mb-6">
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
      
      <div className="mt-6 rounded-lg border border-blue-100 overflow-hidden">
        <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
          <p className="font-medium text-blue-800 text-sm">How to reorder sections</p>
        </div>
        <div className="bg-white p-4">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">1.</span>
              <span>Click and hold the drag handle <FaBars className="inline text-gray-500 mx-1" /> next to any section</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">2.</span>
              <span>Drag the section up or down to change its position</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">3.</span>
              <span>Release to drop the section in its new place</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

// function DraggableSections({ sections, updateSections }) {
//   const [activeId, setActiveId] = useState(null)
  
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 5,
//       },
//     }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   )

//   const handleDragStart = (event) => {
//     setActiveId(event.active.id)
//   }

//   const handleDragEnd = (event) => {
//     const { active, over } = event
    
//     if (over && active.id !== over.id) {
//       const oldIndex = sections.findIndex(item => item.id === active.id)
//       const newIndex = sections.findIndex(item => item.id === over.id)
      
//       const newSections = arrayMove(sections, oldIndex, newIndex)
//       updateSections(newSections)
//     }
    
//     setActiveId(null)
//   }

//   const handleDragCancel = () => {
//     setActiveId(null)
//   }

//   const getActiveItem = () => {
//     const activeItem = sections.find(section => section.id === activeId)
//     return activeItem ? activeItem.title : ''
//   }

//   return (
//     <div className="p-4 bg-white rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Reorder Resume Sections</h2>
//       <p className="text-gray-600 mb-4">Drag and drop sections to change their order in your resume.</p>
      
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragStart={handleDragStart}
//         onDragEnd={handleDragEnd}
//         onDragCancel={handleDragCancel}
//       >
//         <SortableContext 
//           items={sections.map(section => section.id)} 
//           strategy={verticalListSortingStrategy}
//         >
//           <div className="space-y-2">
//             {sections.map(section => (
//               <SortableItem 
//                 key={section.id} 
//                 id={section.id} 
//                 title={section.title} 
//               />
//             ))}
//           </div>
//         </SortableContext>
        
//         <DragOverlay>
//           {activeId ? <DraggableItem title={getActiveItem()} /> : null}
//         </DragOverlay>
//       </DndContext>
      
//       <div className="mt-6 text-sm text-gray-500 p-3 bg-blue-50 rounded-md">
//         <p className="font-medium text-blue-700 mb-1">How to reorder sections:</p>
//         <ol className="list-decimal list-inside space-y-1 text-gray-600">
//           <li>Click and hold the drag handle (≡) next to any section</li>
//           <li>Drag the section up or down to its new position</li>
//           <li>Release to drop the section in its new place</li>
//         </ol>
//       </div>
//     </div>
//   )
// }

export default DraggableSections