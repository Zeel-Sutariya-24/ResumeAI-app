import React from "react";
import { FaTrash } from "react-icons/fa";

const CustomForm = ({
  section,
  updateCustomSectionField,
  updateCustomItemField,
  addCustomItem,
  deleteCustomItem,
  deleteCustomSection,
}) => {
  if (!section) return null;

  return (
    <div>
      {/* Section Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-base text-slate-800 dark:text-white">
          {section.title}
        </h3>

        <button
          onClick={() => deleteCustomSection(section.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash size={16} />
        </button>
      </div>

      {/* Section Title Edit */}
      <label className="block font-semibold mb-1 text-sm">Section Title</label>
      <input
        type="text"
        value={section.title}
        onChange={(e) =>
          updateCustomSectionField(section.id, "title", e.target.value)
        }
        className="w-full text-sm px-4 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600 mb-4"
      />

      {/* Items */}
      {section.items.map((item) => (
        <div
          key={item.id}
          className="mb-6 text-sm p-4 border rounded-xl bg-white dark:bg-[#0a1226] border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-slate-800 dark:text-white">
              Item
            </h4>
            <button
              onClick={() => deleteCustomItem(section.id, item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash size={14} />
            </button>
          </div>

          {/* Subheading */}
          <label className="block text-sm font-semibold mb-1">Subheading</label>
          <input
            type="text"
            value={item.subheading}
            onChange={(e) =>
              updateCustomItemField(section.id, item.id, "subheading", e.target.value)
            }
            className="w-full text-sm px-3 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600 mb-3"
          />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
            <div>
              <label className="block text-sm font-semibold mb-1">Start Date</label>
              <input
                type="month"
                value={item.startDate}
                onChange={(e) =>
                  updateCustomItemField(section.id, item.id, "startDate", e.target.value)
                }
                className="w-full text-sm px-3 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">End Date</label>
              <input
                type="month"
                value={item.endDate}
                onChange={(e) =>
                  updateCustomItemField(section.id, item.id, "endDate", e.target.value)
                }
                className="w-full text-sm px-3 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600"
              />
            </div>
          </div>

          {/* Description */}
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            rows="4"
            value={item.description}
            onChange={(e) =>
              updateCustomItemField(section.id, item.id, "description", e.target.value)
            }
            className="w-full text-sm px-3 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600"
          />
        </div>
      ))}

      {/* Add Item Button */}
      <div
        onClick={() => addCustomItem(section.id)}
        className="text-sm cursor-pointer border border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center 
        text-slate-600 dark:text-slate-300 hover:border-[#4f46e5] dark:hover:border-[#4f46e5] hover:bg-purple-100 dark:hover:bg-slate-700/20 transition mb-6"
      >
        + Add Item
      </div>
    </div>
  );
};

export default CustomForm;
