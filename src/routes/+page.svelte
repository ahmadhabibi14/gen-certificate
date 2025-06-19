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
        <span class="nama-lengkap">Ahmad Rizky Nusantara Habibi</span>

        <!-- Label Pencapaian -->
        <span class="label-achievement">Atas partisipasi pada acara</span>
        <!-- Pencapaian -->
        <div class="achievement">
          <p>Meet Up Cyber Security: The Smart Way to Start in Cyber Security</p>
        </div>

        <!-- Tanggal Sertifikat -->
        <span class="date">14 Juni 2025</span>

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
            <span class="field">CYBER SECURITY</span>
            <span class="type">Certificate Completion</span>
          </div>
          <!-- ID Sertifikat -->
          <span class="certificate-id">ID: 49DK2MAPNBQP</span>
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