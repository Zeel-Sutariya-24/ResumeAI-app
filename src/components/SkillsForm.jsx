import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagicWandSparkles,
  faTrash,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useResume } from "../context/ResumeContext";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* ============================
   Sortable Skill Item
============================ */
const SortableSkillItem = ({ skill, setSkills }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-2 mb-2 p-2 rounded-lg
        bg-white dark:bg-[#0f1b33]
        border border-slate-300 dark:border-slate-700
        ${transform ? "opacity-70 scale-[0.98]" : ""}
      `}
    >
      {/* Drag Handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="
          flex items-center justify-center
          w-10 h-10 rounded-lg
          bg-slate-200 dark:bg-slate-700
          text-slate-600 dark:text-slate-300
          hover:bg-purple-600 dark:hover:bg-purple-300
          hover:text-white dark:hover:text-purple-900
          cursor-grab active:cursor-grabbing touch-none
        "
        aria-label="Drag skill"
      >
        ☰
      </button>

      {/* Editable Skill */}
      <input
        type="text"
        value={skill.name}
        onChange={(e) => {
          const value = e.target.value;
          setSkills((prev) =>
            prev.map((s) =>
              s.id === skill.id ? { ...s, name: value } : s
            )
          );
        }}
        className="
          flex-1 px-3 py-2 rounded-lg bg-transparent
          text-sm text-slate-800 dark:text-slate-200
          focus:outline-none focus:ring-2 focus:ring-purple-500
        "
      />

      {/* Delete Single */}
      <button
        onClick={() =>
          setSkills((prev) => prev.filter((s) => s.id !== skill.id))
        }
        className="px-3 py-2 rounded-lg text-slate-500 hover:text-red-600"
      >
        <FaTrash size={14} />
      </button>
    </div>
  );
};

/* ============================
   Skills Form
============================ */
const SkillsForm = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const {
    personalInfo,
    summary,
    experience,
    education,
    customForm
  } = useResume();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 }
    })
  );

  /* ---------- Drag End ---------- */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSkills((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      const updated = [...items];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);

      return updated;
    });
  };

  /* ---------- Add Skill ---------- */
  const addSkill = () => {
    if (!newSkill.trim()) return;

    // prevent duplicates
    if (
      skills.some(
        (s) => s.name.toLowerCase() === newSkill.trim().toLowerCase()
      )
    ) {
      setNewSkill("");
      return;
    }

    setSkills((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        name: newSkill.trim()
      }
    ]);

    setNewSkill("");
  };

  /* ---------- AI Generate ---------- */
  const handleGenerateSkills = async () => {
    try {
      setLoadingAI(true);

      const resumeData = {
        personalInfo,
        summary,
        experience,
        education,
        customForm
      };

      const res = await axios.post(
        "http://localhost:5000/api/generate-skills",
        { resumeData }
      );

      const aiSkills = res.data.skills.map((skill) => ({
        id: Date.now() + Math.random(),
        name: skill
      }));

      // merge + remove duplicates
      const uniqueSkills = aiSkills.filter(
        (ai) =>
          !skills.some(
            (s) => s.name.toLowerCase() === ai.name.toLowerCase()
          )
      );

      setSkills((prev) => [...prev, ...uniqueSkills]);
    } catch (err) {
      console.error("Skill generation failed", err);
    } finally {
      setLoadingAI(false);
    }
    console.log("AI Generate button clicked");

  };

  return (
    <div>
      {/* ACTION BAR */}
      <div className="flex text-sm flex-wrap gap-2 mb-4">
        {/* Add Skill */}
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            className="
              flex-1 px-3 py-2 rounded-lg
              border border-slate-300 dark:border-slate-600
              bg-white dark:bg-[#0f1b33]
              text-sm text-slate-800 dark:text-slate-200
            "
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
          />

          <button
            onClick={addSkill}
            className="
              px-4 py-2 rounded-lg text-xs font-semibold
              bg-purple-600 text-white hover:bg-purple-700
              flex items-center gap-2
            "
          >
            <FontAwesomeIcon icon={faPlus} />
            Add
          </button>
        </div>

        {/* AI Generate */}
        <button
          onClick={handleGenerateSkills}
          disabled={loadingAI}
          className="
            w-full py-3 rounded-lg mb-2
            bg-purple-600/10 text-purple-700 dark:text-purple-300
            border-2 border-dashed border-purple-300 dark:border-purple-500
            hover:bg-purple-600/20 hover:border-purple-400
            transition text-xs font-medium
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          <FontAwesomeIcon
            icon={faMagicWandSparkles}
            className="mr-2 h-4 w-4"
          />
          {loadingAI
            ? "Generating skills..."
            : "Auto-generate skills based on experience"}
        </button>
      </div>

      {/* Delete All */}
      {skills.length > 0 && (
        <div className="flex justify-end mb-3">
          <button
            onClick={() => {
              if (window.confirm("Delete all skills?")) {
                setSkills([]);
              }
            }}
            className="
              px-4 py-2 rounded-lg text-xs font-semibold
              bg-red-600 text-white hover:bg-red-700
            "
          >
            Delete All
            <FontAwesomeIcon icon={faTrash} className="ml-2" />
          </button>
        </div>
      )}

      {/* SORTABLE LIST */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={skills.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {skills.map((skill) => (
            <SortableSkillItem
              key={skill.id}
              skill={skill}
              setSkills={setSkills}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SkillsForm;
