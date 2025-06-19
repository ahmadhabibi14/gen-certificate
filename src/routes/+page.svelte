<script lang="ts">
	import { onMount } from "svelte";
  import * as htmlToImage from 'html-to-image';

  let certificateEl: HTMLDivElement;
  let isCertificateReady: boolean = false;

  onMount(() => {
    isCertificateReady = true;
  })

  async function generateCertificate() {
    htmlToImage.toPng(certificateEl, {
      quality: 1,
    }).then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = dataUrl;
      link.click();
    });
  }
</script>

<div class="flex w-full min-h-[1000px]">
  <div class="container mx-auto my-10 flex flex-col justify-center items-center gap-5">
    <h1 class="text-4xl font-bold">Generate Certificate</h1>
    {#if isCertificateReady}
      <div bind:this={certificateEl} id="certificate" class="certificate aspect-auto border border-neutral-200 relative">
        <img
          src="img/certificate-template.png"
          alt="template"
          class="w-full h-full"
          crossorigin="anonymous"
        />

        <!-- Label Nama -->
        <div class="absolute text-xl top-60 left-26">
          <span class="text-dark-cert">Diberikan kepada</span>
        </div>
        <!-- Nama Lengkap -->
        <div class="absolute text-5xl font-bold top-66 left-26">
          <span class="text-uniqhbaunderground">Ahmad Rizky Nusantara Habibi</span>
        </div>

        <!-- Label Pencapaian -->
        <div class="absolute text-xl top-87 left-26">
          <span class="text-dark-cert">Atas partisipasi pada acara</span>
        </div>
        <!-- Pencapaian -->
        <div class="absolute text-5xl font-bold top-95 left-26 w-7/12 leading-14">
          <span class="text-uniqhbaunderground">Meet Up Cyber Security: The Smart Way to Start in Cyber Security</span>
        </div>

        <!-- Tanggal Sertifikat -->
        <div class="absolute text-xl bottom-27 left-171">
          <span class="text-dark-cert font-bold">14 Juni 2025</span>
        </div>

        <!-- ID Sertifikat -->
        <div class="absolute text-xl bottom-23 right-27">
          <span class="text-dark-cert font-bold">ID: 49DK2MAPNBQP</span>
        </div>
      </div>
    {/if}
    <div class="flex items-center justify-center w-full">
      <button onclick={generateCertificate} class="w-fit py-4 px-10 bg-uniqhbaunderground text-white font-bold text-xl rounded-lg cursor-pointer hover:bg-uniqhbaunderground/90">
        Generate
      </button>
    </div>
  </div>
</div>