import { useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { knowledgeGraphNodes, knowledgeGraphEdges } from '../data/mockData';
import { useI18n } from '../i18n';

const subjectColors: Record<string, string> = {
  physics: '#F59E0B',
  math: '#60A5FA',
  history: '#FB923C',
  chemistry: '#34D399',
  biology: '#A78BFA',
  geography: '#2DD4BF',
};

function KGNode({ data }: { data: { label: string; subject: string; mastery: number } }) {
  const color = subjectColors[data.subject] || '#94A3B8';
  const size = 20 + data.mastery * 30;

  return (
    <div
      className="flex items-center justify-center rounded-full border-2 text-xs font-medium cursor-pointer transition-transform hover:scale-110"
      style={{
        width: size * 2,
        height: size * 2,
        backgroundColor: color + '20',
        borderColor: color + '80',
        color: color,
        boxShadow: `0 0 ${data.mastery * 15}px ${color}40`,
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />
      {data.label}
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  kg: KGNode,
};

export default function KnowledgeGraphPage() {
  const [filter, setFilter] = useState<string>('all');
  const { t } = useI18n();

  const subjectKeys = ['physics', 'math', 'history', 'chemistry', 'biology', 'geography'];

  const filteredNodes = useMemo(() => {
    return knowledgeGraphNodes.filter(
      (n) => filter === 'all' || n.subject === filter
    );
  }, [filter]);

  const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));

  const nodes: Node[] = useMemo(
    () =>
      filteredNodes.map((n) => ({
        id: n.id,
        type: 'kg',
        position: { x: n.x, y: n.y },
        data: { label: n.label, subject: n.subject, mastery: n.mastery },
      })),
    [filteredNodes]
  );

  const edges: Edge[] = useMemo(
    () =>
      knowledgeGraphEdges
        .filter((e) => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target))
        .map((e, i) => {
          const sourceNode = knowledgeGraphNodes.find((n) => n.id === e.source);
          const targetNode = knowledgeGraphNodes.find((n) => n.id === e.target);
          const isCrossSubject = sourceNode?.subject !== targetNode?.subject;
          return {
            id: `kg-e-${i}`,
            source: e.source,
            target: e.target,
            animated: isCrossSubject,
            style: {
              stroke: isCrossSubject ? '#F59E0B' : '#334155',
              strokeWidth: isCrossSubject ? 2 : 1,
              strokeDasharray: isCrossSubject ? undefined : '5,5',
            },
          };
        }),
    [filteredNodeIds]
  );

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

  useMemo(() => {
    setRfNodes(nodes);
    setRfEdges(edges);
  }, [nodes, edges, setRfNodes, setRfEdges]);

  const totalConcepts = knowledgeGraphNodes.length;
  const avgMastery = Math.round(
    (knowledgeGraphNodes.reduce((sum, n) => sum + n.mastery, 0) / totalConcepts) * 100
  );

  return (
    <div className="flex flex-col h-[calc(100dvh-80px)]">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold mb-1">{t('knowledgeGraph.title')}</h1>
        <p className="text-sm text-muted">
          {t('knowledgeGraph.stats', { concepts: totalConcepts, mastery: avgMastery })}
        </p>

        {/* Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm transition-colors ${
              filter === 'all'
                ? 'bg-warm-amber text-deep-blue font-medium'
                : 'bg-deep-blue-lighter text-muted hover:text-focus-white'
            }`}
          >
            {t('common.all')}
          </button>
          {subjectKeys.map((key) => {
            const count = knowledgeGraphNodes.filter((n) => n.subject === key).length;
            if (count === 0) return null;
            const name = t(`subjects.${key}`);
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1.5 ${
                  filter === key
                    ? 'font-medium'
                    : 'bg-deep-blue-lighter text-muted hover:text-focus-white'
                }`}
                style={
                  filter === key
                    ? {
                        backgroundColor: subjectColors[key] + '20',
                        color: subjectColors[key],
                        border: `1px solid ${subjectColors[key]}50`,
                      }
                    : undefined
                }
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: subjectColors[key] }}
                />
                {name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Graph */}
      <div className="flex-1 mx-4 mb-4 rounded-2xl overflow-hidden border border-border">
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          className="bg-deep-blue"
        >
          <Background color="#334155" gap={20} size={1} />
          <Controls
            className="!bg-card !border-border !rounded-xl !shadow-none [&_button]:!bg-card [&_button]:!border-border [&_button]:!text-muted [&_button]:hover:!bg-deep-blue-lighter"
          />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-center gap-6 text-xs text-muted">
          <span>{t('knowledgeGraph.legendSize')}</span>
          <span className="flex items-center gap-1">
            <div className="w-6 h-0.5 bg-warm-amber" />
            {t('knowledgeGraph.legendCross')}
          </span>
        </div>
      </div>
    </div>
  );
}
