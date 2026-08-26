import { EllipsisVertical, Plus, Search } from "lucide-react";
import { useState } from "react";
import { EmitterCard, type EmitterSummary } from "../components/EmitterCard";
import { EmitterConfiguration } from "../components/EmitterConfiguration";
import { AddEmitterForm } from "../components/AddEmitterForm";
import { PanelHeaderButton, PanelHeaderIconButton, PanelPageHeader } from "../../../shared/components/PanelPageHeader";

const emitters: EmitterSummary[] = [
  { id: "1", businessName: "PENDIENTE DE CONFIGURAR", commercialName: "Emisor principal", rfc: "PEND000000001", taxRegime: "601 · General de Ley Personas Morales", postalCode: "00000", certificateStatus: "Pendiente" },
  { id: "2", businessName: "VERTEX CONTABLE, S.A. DE C.V.", commercialName: "Vertex Contable", rfc: "VCO240101AB1", taxRegime: "601 · General de Ley Personas Morales", postalCode: "06600", certificateStatus: "Vigente" },
];

export function EmittersPage() {
  const [emitterList, setEmitterList] = useState(emitters);
  const [selectedEmitter, setSelectedEmitter] = useState<EmitterSummary>();
  const [isAddingEmitter, setIsAddingEmitter] = useState(false);
  const [query, setQuery] = useState("");

  if (isAddingEmitter) {
    return (
      <AddEmitterForm
        onBack={() => setIsAddingEmitter(false)}
        onCreated={(emitter) => {
          setEmitterList((current) => [...current, emitter]);
          setIsAddingEmitter(false);
          setSelectedEmitter(emitter);
        }}
      />
    );
  }

  if (selectedEmitter) {
    return (
      <EmitterConfiguration
        emitter={selectedEmitter}
        onBack={() => setSelectedEmitter(undefined)}
        onUpdated={(updatedEmitter) => {
          setEmitterList((current) => current.map((emitter) => emitter.id === updatedEmitter.id ? updatedEmitter : emitter));
          setSelectedEmitter(updatedEmitter);
        }}
      />
    );
  }

  const filteredEmitters = emitterList.filter((emitter) => `${emitter.businessName} ${emitter.commercialName} ${emitter.rfc}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="mx-auto w-full max-w-[82rem]">
      <PanelPageHeader
        eyebrow="Configuración fiscal"
        title="Emisores"
        description="Administra las razones sociales desde las que emites tus comprobantes."
        action={
          <>
            <PanelHeaderButton label="Agregar emisor" onClick={() => setIsAddingEmitter(true)}>
              <Plus size={17} strokeWidth={1.7} />
            </PanelHeaderButton>
            <PanelHeaderIconButton label="Más opciones">
              <EllipsisVertical size={17} strokeWidth={1.7} />
            </PanelHeaderIconButton>
          </>
        }
      />
      <div className="emitter-search mt-5 flex max-w-xl items-center gap-3 rounded-xl border bg-white px-4 shadow-[0_3px_10px_rgba(20,59,53,.02)] focus-within:border-[var(--color-brand)]/40">
        <Search size={16} className="text-[var(--color-muted)]" strokeWidth={1.6} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full border-0 bg-transparent py-3 text-xs outline-none" placeholder="Buscar por nombre o RFC" />
      </div>
      <div className="mt-6 grid max-w-[70rem] gap-4">
        {filteredEmitters.map((emitter) => <EmitterCard key={emitter.id} emitter={emitter} onConfigure={setSelectedEmitter} />)}
      </div>
    </div>
  );
}
