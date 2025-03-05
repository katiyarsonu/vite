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
import useResumeStore from '../store/resumeStore'

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
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`p-4 mb-2 bg-white rounded-md shadow-sm border border-gray-200 flex items-center ${isDragging ? 'border-blue-500 shadow-md' : ''}`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="mr-3 text-gray-400 cursor-grab hover:text-gray-600 active:cursor-grabbing p-2"
      >
        <FaBars />
      </div>
      <span className="font-medium">{title}</span>
    </div>
  )
}

function DraggableItem({ title }) {
  return (
    <div className="p-4 mb-2 bg-white rounded-md shadow-md border border-blue-500 flex items-center">
      <div className="mr-3 text-gray-400 p-2">
        <FaBars />
      </div>
      <span className="font-medium">{title}</span>
    </div>
  )
}

function DraggableSections({ sections, onSectionOrderChange }) {
  const [activeId, setActiveId] = useState(null)
  const { pageMargins, updatePageMargins } = useResumeStore()
  
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
      
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Page Setup</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Top & Bottom Margins (mm)</p>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label htmlFor="topMargin" className="block text-xs text-gray-500 mb-1">Top</label>
                <input
                  id="topMargin"
                  type="range"
                  min="0"
                  max="50"
                  value={pageMargins.top}
                  onChange={(e) => updatePageMargins({ top: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{pageMargins.top} mm</span>
                  <span>50</span>
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="bottomMargin" className="block text-xs text-gray-500 mb-1">Bottom</label>
                <input
                  id="bottomMargin"
                  type="range"
                  min="0"
                  max="50"
                  value={pageMargins.bottom}
                  onChange={(e) => updatePageMargins({ bottom: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{pageMargins.bottom} mm</span>
                  <span>50</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Left & Right Margins (mm)</p>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label htmlFor="leftMargin" className="block text-xs text-gray-500 mb-1">Left</label>
                <input
                  id="leftMargin"
                  type="range"
                  min="0"
                  max="50"
                  value={pageMargins.left}
                  onChange={(e) => updatePageMargins({ left: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{pageMargins.left} mm</span>
                  <span>50</span>
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="rightMargin" className="block text-xs text-gray-500 mb-1">Right</label>
                <input
                  id="rightMargin"
                  type="range"
                  min="0"
                  max="50"
                  value={pageMargins.right}
                  onChange={(e) => updatePageMargins({ right: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{pageMargins.right} mm</span>
                  <span>50</span>
                </div>
              </div>
            </div>
          </div>
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