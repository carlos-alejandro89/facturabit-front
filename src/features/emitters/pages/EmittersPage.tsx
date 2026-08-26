import { EllipsisVertical, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EmitterCard, type EmitterSummary } from "../components/EmitterCard";
import { EmitterConfiguration } from "../components/EmitterConfiguration";
import { AddEmitterForm } from "../components/AddEmitterForm";
import { PanelHeaderButton, PanelHeaderIconButton, PanelPageHeader } from "../../../shared/components/PanelPageHeader";
import { getFiscalEntities, type FiscalEntity } from "../services/emitterService";
import { EmitterCardsSkeleton } from "../../../shared/components/Skeleton";

function mapEntity(entity: FiscalEntity): EmitterSummary {
  const regime = [entity.satRegimenFiscalClave, entity.satRegimenFiscalNombre].filter(Boolean).join(" · ");
  return {
    id: entity.guid,
    businessName: entity.razonSocial,
    commercialName: entity.nombreComercial || entity.razonSocial,
    rfc: entity.rfc,
    taxRegime: regime || "Sin régimen fiscal",
    taxRegimeId: entity.satRegimenFiscalId ?? undefined,
    postalCode: entity.codigoPostal,
    certificateStatus: entity.certificadoVigente ? "Vigente" : "Pendiente",
    email: entity.correoComercial ?? "",
    phone: entity.telefonoComercial ?? "",
    street: entity.calle ?? "",
    exteriorNumber: entity.numExt ?? "",
    interiorNumber: entity.numInt ?? "",
    neighborhood: entity.colonia ?? "",
    city: entity.ciudad ?? "",
    state: entity.estado ?? "",
  };
}

export function EmittersPage() {
  const [emitterList, setEmitterList] = useState<EmitterSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmitter, setSelectedEmitter] = useState<EmitterSummary>();
  const [isAddingEmitter, setIsAddingEmitter] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    getFiscalEntities(controller.signal)
      .then((entities) => setEmitterList(entities.map(mapEntity)))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        toast.error(error instanceof Error ? error.message : "No fue posible cargar los emisores.");
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);

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
        {isLoading && <EmitterCardsSkeleton />}
        {!isLoading && filteredEmitters.length === 0 && <p className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white py-12 text-center text-xs text-[var(--color-muted)]">No encontramos emisores para esta organización.</p>}
        {filteredEmitters.map((emitter) => <EmitterCard key={emitter.id} emitter={emitter} onConfigure={setSelectedEmitter} />)}
      </div>
    </div>
  );
}
