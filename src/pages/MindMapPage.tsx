import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Share2, RotateCcw, Sparkles } from 'lucide-react';
import { allDialogueScripts } from '../data/dialogues';
import { useI18n } from '../i18n';

function ConceptNode({ data }: { data: { label: string; discoveredByStudent: boolean } }) {
  return (
    <div
      className={`px-4 py-2 rounded-xl border-2 text-sm font-medium min-w-[80px] text-center transition-all ${
        data.discoveredByStudent
          ? 'bg-warm-amber/20 border-warm-amber text-warm-amber animate-pulse-glow'
          : 'bg-wisdom-purple/20 border-wisdom-purple/50 text-wisdom-purple-light'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />
      {data.discoveredByStudent && (
        <Sparkles className="w-3 h-3 inline mr-1" />
      )}
      {data.label}
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  concept: ConceptNode,
};

export default function MindMapPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const script = allDialogueScripts.find((s) => s.id === id);

  const initialNodes: Node[] = useMemo(() => {
    if (!script) return [];
    return script.mindMapNodes.map((n) => ({
      id: n.id,
      type: 'concept',
      position: { x: n.x, y: n.y },
      data: {
        label: n.label,
        discoveredByStudent: n.discoveredByStudent,
      },
    }));
  }, [script]);

  const initialEdges: Edge[] = useMemo(() => {
    if (!script) return [];
    return script.mindMapEdges.map((e, i) => ({
      id: `e-${i}`,
      source: e.source,
      target: e.target,
      label: e.label,
      animated: true,
      style: { stroke: '#7C5CFC', strokeWidth: 2 },
      labelStyle: { fill: '#94A3B8', fontSize: 11 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#7C5CFC',
      },
    }));
  }, [script]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  if (!script) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted">{t('mindmap.notFound')}</p>
      </div>
    );
  }

  const studentDiscovered = script.mindMapNodes.filter((n) => n.discoveredByStudent).length;
  const total = script.mindMapNodes.length;

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)]">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-1">{t('mindmap.title')}</h2>
        <p className="text-sm text-muted">{script.title}</p>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-warm-amber" />
            <span className="text-muted">
              {t('mindmap.yourDiscovery')} ({studentDiscovered})
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-wisdom-purple" />
            <span className="text-muted">
              {t('mindmap.aiGuided')} ({total - studentDiscovered})
            </span>
          </div>
        </div>
      </div>

      {/* React Flow */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          proOptions={{ hideAttribution: true }}
          className="bg-deep-blue"
        >
          <Background color="#334155" gap={20} size={1} />
          <Controls
            className="!bg-card !border-border !rounded-xl !shadow-none [&_button]:!bg-card [&_button]:!border-border [&_button]:!text-muted [&_button]:hover:!bg-deep-blue-lighter"
          />
        </ReactFlow>
      </div>

      {/* Actions */}
      <div className="px-4 py-4 border-t border-border flex gap-3">
        <button
          onClick={() => {
            // Simulate share
            if (navigator.share) {
              navigator.share({
                title: t('mindmap.shareTitle', { title: script.title }),
                text: t('mindmap.shareText', { count: studentDiscovered }),
                url: window.location.href,
              }).catch(() => {});
            } else {
              alert(t('mindmap.shareCopied'));
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 bg-wisdom-purple/20 border border-wisdom-purple/30 text-wisdom-purple-light rounded-xl py-3 hover:bg-wisdom-purple/30 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          {t('common.share')}
        </button>
        <button
          onClick={() => navigate('/explore')}
          className="flex-1 flex items-center justify-center gap-2 bg-warm-amber text-deep-blue font-semibold rounded-xl py-3 hover:bg-warm-amber-light transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {t('common.continueExplore')}
        </button>
      </div>
    </div>
  );
}
