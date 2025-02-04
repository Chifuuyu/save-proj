import { useEffect, useRef } from "preact/hooks";
import Chart from "chart.js/auto";

export default function ChartIsland() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sample data for six months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const spendingData = [650, 590, 800, 810, 560, 550]; // Actual spending amounts
  const incomeData = [5000, 4800, 5100, 5300, 5500, 5200]; // Total income amounts

  useEffect(() => {
    if (!canvasRef.current) {
      console.error("Canvas element not found");
      return;
    }
    
    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Actual Spending",
            data: spendingData,
            backgroundColor: "rgba(239, 68, 68, 0.8)", // red tint
            borderColor: "rgba(239, 68, 68, 1)",
            borderWidth: 1,
            borderRadius: 5, // rounded corners on bars
            barPercentage: 0.6,
          },
          {
            label: "All Income",
            data: incomeData,
            backgroundColor: "rgba(16, 185, 129, 0.8)", // green tint
            borderColor: "rgba(16, 185, 129, 1)",
            borderWidth: 1,
            borderRadius: 5,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            bottom: 10,
            left: 10,
            right: 10,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              tickBorderDashOffset: 2,
            },
            title: {
              display: true,
              text: "Amount ($)",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 20,
              padding: 10,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(0,0,0,0.7)",
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 12,
            },
            padding: 10,
            cornerRadius: 4,
          },
        },
        animation: {
          duration: 1500,
          easing: "easeOutBounce",
        },
      },
    });

    // Cleanup chart instance on component unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div style="height:300px;">
      <canvas
        ref={canvasRef}
        style="display:block; width:100%; height:100%;"
      />
    </div>
  );
}
