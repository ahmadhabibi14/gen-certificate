<script lang="ts">
  import * as htmlToImage from 'html-to-image';
	import Input from "@/lib/components/ui/input/input.svelte";
	import Button from "@/lib/components/ui/button/button.svelte";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { LoaderCircle } from '@lucide/svelte';
  import {
	CalendarDate,
    DateFormatter,
    type DateValue,
    getLocalTimeZone
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  let isGenerating: boolean = $state(false);

  let namaLengkap: string = $state('Ahmad Rizky Nusantara Habibi');
  let labelAchievement: string = $state('Atas partisipasi pada acara');
  let achievement: string = $state('Meet Up Cyber Security: The Smart Way to Start in Cyber Security');

  const fields = [
    'CYBER SECURITY',
    'UI/UX DESIGN',
    'WEB PROGRAMMING',
    'INTERNET OF THINGS',
  ];

  let field: string = $state('CYBER SECURITY');

  const certTypes = [
    'Certificate Completion',
    'Certificate Participation',
    'Certificate Achievement',
  ]
  let certType: string = $state('Certificate Completion')

  let certId: string = $state('49DK2MAPNBQP');
  
  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });

  const year: number = new Date().getFullYear();
  const month: number = new Date().getMonth() + 1;
  const day: number = new Date().getDate();

  let tanggal = $state<DateValue | undefined>(new CalendarDate(year, month, day));
  let contentRef = $state<HTMLElement | null>(null);

  let indoDate: string = $state('');

  function formatTanggalIndo(tanggal: string) {
    const bulanIndo = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const [year, month, day] = tanggal.split("-");
    return `${parseInt(day)} ${bulanIndo[parseInt(month) - 1]} ${year}`;
  }

  let certificateEl: HTMLDivElement;

  async function generateCertificate() {
    isGenerating = true;
    indoDate = formatTanggalIndo(tanggal?.toString() || '')
    htmlToImage.toPng(certificateEl, {
      quality: 1,
    }).then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = dataUrl;
      link.click();

      isGenerating = false;
    });
  }
</script>

<div class="flex w-full min-h-screen flex-col relative">
  <div class="h-full container mx-auto my-10 flex flex-col gap-5">
    <h1 class="text-2xl md:text-4xl font-bold text-center">Generate Certificate</h1>
    <div class="flex flex-col gap-5 w-full px-5 md:px-0 md:w-[500px] mx-auto">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1.5 w-full">
          <label for="namaLengkap" class="text-xs ml-2">Nama Lengkap</label>
          <Input
            id="namaLengkap"
            bind:value={namaLengkap}
            placeholder="I Komang John Cena"
          />
        </div>
        <div class="flex flex-col gap-1.5 w-full">
          <label for="labelAchievement" class="text-xs ml-2">Label Pencapaian</label>
          <Input
            id="labelAchievement"
            bind:value={labelAchievement}
            placeholder="Atas partisipasi pada acara"
          />
        </div>
        <div class="flex flex-col gap-1.5 w-full">
          <label for="achievement" class="text-xs ml-2">Pencapaian</label>
          <Input
            id="achievement"
            bind:value={achievement}
            placeholder="Meet Up Cyber Security: The Smart Way to Start in Cyber Security"
          />
        </div>
        <div class="flex flex-col gap-1.5 w-full">
          <label for="date" class="text-xs ml-2">Tanggal</label>
          <Popover.Root>
            <Popover.Trigger
              class={cn(
                buttonVariants({
                  variant: "outline",
                  class: "w-full justify-start text-left font-normal"
                }),
                !tanggal && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {tanggal ? df.format(tanggal.toDate(getLocalTimeZone())) : "Pick a date"}
            </Popover.Trigger>
            <Popover.Content bind:ref={contentRef} class="w-auto p-0">
              <Calendar type="single" bind:value={tanggal} />
            </Popover.Content>
          </Popover.Root>
        </div>
        <div class="flex flex-col gap-1.5 w-full">
          <label for="field" class="text-xs ml-2">Field</label>
          <Select.Root type="single" name="field" bind:value={field}>
            <Select.Trigger class="w-full">
              {field ? field : "Pilih Field"}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Fields</Select.Label>
                {#each fields as f}
                  <Select.Item
                    value={f}
                    label={f}
                  >
                    {f}
                  </Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex flex-col gap-1.5 w-full">
          <label for="certType" class="text-xs ml-2">Certificate Type</label>
          <Select.Root type="single" name="certType" bind:value={certType}>
            <Select.Trigger class="w-full">
              {certType ? certType : "Pilih Jenis Sertifikat"}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Certificate Types</Select.Label>
                {#each certTypes as c}
                  <Select.Item
                    value={c}
                    label={c}
                  >
                    {c}
                  </Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex flex-col gap-1.5 w-full">
          <label for="certId" class="text-xs ml-2">Certificate ID</label>
          <Input
            id="certId"
            bind:value={certId}
            placeholder=""
          />
        </div>
      </div>

      <div class="flex items-center justify-center w-full">
        <Button disabled={isGenerating} onclick={generateCertificate} class="disabled:cursor-not-allowed w-full cursor-pointer flex justify-center items-center gap-2">
          {#if isGenerating}
            <LoaderCircle class="h-4 w-4 animate-spin" />
            Generating...
          {/if}
          {#if !isGenerating}
            Generate
          {/if}
        </Button>
      </div>
    </div>
  </div>

  <div class="w-0 h-0 overflow-hidden">
    <div bind:this={certificateEl} id="certificate" class="certificate">
      <img
        src="img/certificate-template.png"
        alt="template"
        class="w-full h-full"
        crossorigin="anonymous"
      />

      <!-- Label Nama -->
      <span class="label-nama">Diberikan kepada</span>
      <!-- Nama Lengkap -->
      <span class="nama-lengkap">{namaLengkap}</span>

      <!-- Label Pencapaian -->
      <span class="label-achievement">{labelAchievement}</span>
      <!-- Pencapaian -->
      <div class="achievement">
        <p>{achievement}</p>
      </div>

      <!-- Tanggal Sertifikat -->
      <span class="date">{indoDate}</span>

      <div class="ttd">
        <!-- DEKAN -->
        <div class="item">
          <div class="img-container">
            <img
              src="/img/ttd-dekan.png"
              alt=""
            />
          </div>
          <div class="name-container">
            <span class="nama">Muhammad Yamin S.T, M.T</span>
            <span class="jabatan">Dekan Fakultas Sains dan Teknologi UNIQHBA</span>
          </div>
        </div>

        <!-- KETUA KOMUNITAS -->
        <div class="item">
          <div class="img-container">
            <img
              src="/img/ttd-ketua-komunitas.png"
              alt=""
            />
          </div>
          <div class="name-container">
            <span class="nama">Ahmad Rizky Nusantara Habibi</span>
            <span class="jabatan">Ketua komunitas UNIQHBA Underground</span>
          </div>
        </div>

        <!-- KETUA PANITIA -->
        <div class="item">
          <div class="img-container">
            <img
              src="/img/ttd-ketua-panitia.png"
              alt=""
            />
          </div>
          <div class="name-container">
            <span class="nama">Sabardi Bahari</span>
            <span class="jabatan">Ketua panitia penyelenggara</span>
          </div>
        </div>
      </div>

      <div class="kredensial">
        <div class="certificate-type">
          <span class="field">{field}</span>
          <span class="type">{certType}</span>
        </div>
        <!-- ID Sertifikat -->
        <span class="certificate-id">ID: {certId}</span>
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    --color-uniqhbaunderground: #075F46;
    --color-uniqhbaunderground-2: #178E3B;
    --color-dark-cert: #111827;
    --color-gold: #816208;
  }

  /* CONTAINER */
  .certificate {
    position: relative;
    width: 2000px;
    height: 1211px;
    border: 1px solid var(--color-dark-cert);
  }

  /* NAMA LENGKAP */
  .certificate .label-nama {
    position: absolute;
    top: 280px;
    left: 138px;
    font-size: 35px;
    color: var(--color-dark-cert);
  }
  .certificate .nama-lengkap {
    position: absolute;
    top: 325px;
    left: 138px;
    font-size: 50px;
    color: var(--color-uniqhbaunderground);
    font-weight: 700;
  }

  /* PENCAPAIAN */
  .certificate .label-achievement {
    position: absolute;
    top: 430px;
    left: 138px;
    font-size: 35px;
    color: var(--color-dark-cert);
  }
  .certificate .achievement {
    position: absolute;
    top: 480px;
    left: 138px;
    font-size: 50px;
    color: var(--color-uniqhbaunderground);
    font-weight: 700;
    width: 50%;
  }
  .certificate .achievement p {
    line-height: 120%;
  }

  /* TANGGAL */
  .certificate .date {
    position: absolute;
    top: 690px;
    left: 138px;
    font-size: 35px;
    font-weight: 700;
    color: var(--color-dark-cert);
  }

  /* DEKAN */
  .certificate .ttd {
    height: fit-content;
    position: absolute;
    bottom: 120px;
    left: 142px;
    display: flex;
    flex-direction: row;
    gap: 80px;
  }
  .certificate .ttd .item {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .certificate .ttd .item .img-container {
    width: 214px;
    height: auto;
  }

  .certificate .ttd .item .img-container img {
    width: 100%;
    height: 100%;
  }
  .certificate .ttd .item .name-container {
    display: flex;
    flex-direction: column;
    gap: 0;
    color: var(--color-dark-cert);
  }
  .certificate .ttd .item .name-container .nama {
    font-size: 30px;
    font-weight: 600;
  }
  .certificate .ttd .item .name-container .jabatan {
    font-size: 20px;
  }

  /* KREDENSIAL */
  .certificate .kredensial {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 574px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .certificate .kredensial .certificate-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    justify-content: center;
    color: var(--color-gold);
    margin-top: 125px;
  }

  .certificate .kredensial .certificate-type .field {
    font-weight: 700;
    font-size: 30px;
  }
  .certificate .kredensial .certificate-type .type {
    font-weight: 500;
    font-size: 20px;
  }
  
  .certificate .kredensial .certificate-id {
    font-weight: 700;
    font-size: 25px;
    color: var(--color-dark-cert);
    margin-top: 340px;
    position: absolute;
  }
</style>