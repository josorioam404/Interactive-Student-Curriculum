import React, { useEffect, useMemo, useState } from "react";
import type { StudyPlanItem } from "../types";
import "./AcademicReport.css";

export const AcademicReport: React.FC = () => {
  const [items, setItems] = useState<StudyPlanItem[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL;

  const getToken = () => localStorage.getItem("accessToken") || "";

  const fetchCurriculum = async () => {
    const token = getToken();

    const res = await fetch(`${PYTHON_API_URL}/api/student/curriculum`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("No se pudo obtener la malla curricular");
    const data = await res.json();
    setItems(data.curriculum || []);
  };

  const fetchSummary = async () => {
    const token = getToken();

    const res = await fetch(`${PYTHON_API_URL}/api/student/progress-summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("No se pudo obtener el resumen");
    const data = await res.json();
    setSummary(data);
  };

  const loadData = async () => {
    try {
      await Promise.all([fetchCurriculum(), fetchSummary()]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completed = useMemo(() => {
    if (loading) return [];
    return items.filter(i => i.progress?.status?.toLowerCase() === "completed");
  }, [items, loading]);

  const totalCreditsTaken = useMemo(() => {
    if (loading) return 0;
    return completed.reduce((sum, item) => sum + (item.subject?.credits || 0), 0);
  }, [completed, loading]);

  const totalGradesSum = useMemo(() => {
    if (loading) return 0;
    return completed.reduce((sum, item) => sum + (item.progress?.final_grade ?? 0), 0);
  }, [completed, loading]);

  const pa = useMemo(() => {
    if (loading) return "0.00";
    return completed.length > 0
      ? (totalGradesSum / completed.length).toFixed(2)
      : "0.00";
  }, [completed, totalGradesSum, loading]);

  const papa = useMemo(() => {
    if (loading) return "0.00";
    const weighted = completed.reduce(
      (sum, item) =>
        sum + (item.progress?.final_grade ?? 0) * (item.subject?.credits || 0),
      0
    );
    return totalCreditsTaken > 0
      ? (weighted / totalCreditsTaken).toFixed(2)
      : "0.00";
  }, [completed, totalCreditsTaken, loading]);

  const totalProgramCredits = summary?.totalProgramCredits ?? 0;

  const distribution = useMemo(() => {
    const dist = {
      fundamentacion: { completed: 0, total: 0 },
      disciplinar: { completed: 0, total: 0 },
      libre: { completed: 0, total: 0 },
    };

    if (loading) return dist;

    items.forEach(item => {
      // Use StudyPlan 'component' field (not subject.component_type)
      const comp = (item.component ?? '').toLowerCase();

      const credits = item.subject?.credits ?? 0;

      if (comp === 'foundational' || comp === 'fundamentacion' || comp === 'fundamental') {
        dist.fundamentacion.total += credits;
        if (item.progress?.status?.toLowerCase() === "completed") {
          dist.fundamentacion.completed += credits;
        }
      } else if (comp === 'disciplinary' || comp === 'disciplinar') {
        dist.disciplinar.total += credits;
        if (item.progress?.status?.toLowerCase() === "completed") {
          dist.disciplinar.completed += credits;
        }
      } else if (comp === 'free elective' || comp === 'libre' || comp === 'libre elective' || comp === 'free_elective') {
        dist.libre.total += credits;
        if (item.progress?.status?.toLowerCase() === "completed") {
          dist.libre.completed += credits;
        }
      } else {
        // If unknown component, attempt to categorize by common strings
        // (do not add new categories, just ignore if not matched)
      }
    });

    return dist;
  }, [items, loading]);

  const chartData = useMemo(() => {
    if (loading) return [];
    return [
      { label: "Básico", ...distribution.fundamentacion },
      { label: "Disciplinar", ...distribution.disciplinar },
      { label: "Libre", ...distribution.libre },
    ];
  }, [distribution, loading]);

  const maxCredits = useMemo(() => {
    if (loading) return 1;
    return Math.max(...chartData.map(d => d.total || 1));
  }, [chartData, loading]);

  if (loading) return <p>Cargando reporte...</p>;

  return (
    <div className="report-container">
      <h1 className="report-title">Reporte Académico</h1>

      <section className="summary-cards-grid">
        <div className="summary-card">
          <h3>Promedio General (P.A.)</h3>
          <span className="value">{pa}</span>
          <span className="description">Basado en {completed.length} asignaturas cursadas.</span>
        </div>

        <div className="summary-card">
          <h3>Promedio Ponderado (P.A.P.A.)</h3>
          <span className="value">{papa}</span>
          <span className="description">Promedio ponderado por créditos.</span>
        </div>

        <div className="summary-card">
          <h3>Créditos Completados</h3>
          <span className="value">
            {totalCreditsTaken} / {totalProgramCredits}
          </span>
          <span className="description">Total aprobados del programa.</span>
        </div>
      </section>

      <section className="chart-section">
        <h3 className="chart-title">Distribución de Créditos por Componente</h3>

        <div className="chart-container">
          <div className="chart-grid-line" style={{ bottom: "0%" }}></div>
          <div className="chart-grid-line" style={{ bottom: "50%" }}></div>
          <div className="chart-grid-line" style={{ bottom: "100%" }}></div>

          {chartData.map(item => {
            const totalHeight = (item.total / maxCredits) * 100;
            const completedHeight = item.total ? (item.completed / item.total) * 100 : 0;

            return (
              <div key={item.label} className="bar-group">
                <div className="bar-total" style={{ height: `${totalHeight}%` }}>
                  <div className="bar-filled" style={{ height: `${completedHeight}%` }}></div>
                </div>
                <span className="bar-label">{item.label}</span>
                <span style={{ fontSize: "0.75rem", color: "#888", marginTop: "4px" }}>
                  {item.completed} / {item.total}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="table-section">
        <h3 className="chart-title">Calificaciones Finales</h3>
        <table className="grades-table">
          <thead>
            <tr>
              <th>Semestre</th>
              <th>Código</th>
              <th>Asignatura</th>
              <th>Créditos</th>
              <th>Calificación</th>
            </tr>
          </thead>
          <tbody>
            {completed.map((item, index) => (
              <tr key={index}>
                <td>{item.suggested_semester}</td>
                <td>{item.subject_code}</td>
                <td>{item.subject?.name}</td>
                <td>{item.subject?.credits}</td>
                <td
                  className={
                    (item.progress?.final_grade ?? 0) >= 4.0 ? "grade-good" : "grade-average"
                  }
                >
                  {(item.progress?.final_grade ?? 0).toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};









