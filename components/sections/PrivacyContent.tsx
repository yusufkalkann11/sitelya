'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { EMAIL } from '@/lib/site';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-white mb-3 pb-2 border-b border-white/10">{title}</h2>
      <div className="text-sm text-white/60 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

function TrContent() {
  return (
    <>
      <Section title="1. Veri Sorumlusu">
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) kapsamında kişisel verileriniz;
          veri sorumlusu sıfatıyla <strong className="text-white">Sitelya Agency</strong> tarafından
          aşağıda açıklanan amaçlar ve kapsamda işlenmektedir.
        </p>
        <p>İletişim: <a href={`mailto:${EMAIL}`} className="text-[#60a5fa] hover:text-white transition-colors" translate="no">{EMAIL}</a></p>
      </Section>

      <Section title="2. İşlenen Kişisel Veriler">
        <p>Web sitemizin iletişim formu aracılığıyla aşağıdaki kişisel verileriniz işlenmektedir:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Ad ve soyad</li>
          <li>E-posta adresi</li>
          <li>Telefon numarası</li>
          <li>Tarafınızca iletilen mesaj içeriği</li>
        </ul>
      </Section>

      <Section title="3. Kişisel Verilerin İşlenme Amacı">
        <p>Kişisel verileriniz yalnızca aşağıdaki amaçlarla işlenmektedir:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>İletişim taleplerinizi ve sorularınızı yanıtlamak</li>
          <li>Talep ettiğiniz hizmetler hakkında bilgi vermek</li>
          <li>İş görüşmelerini yürütmek ve teklif hazırlamak</li>
        </ul>
      </Section>

      <Section title="4. Hukuki Dayanak">
        <p>
          Kişisel verileriniz; KVKK&apos;nın 5. maddesi uyarınca <em>ilgili kişinin açık rızası</em> ve
          iletişim formunu doldurarak tarafımıza başvurmanız nedeniyle <em>bir sözleşmenin kurulması veya
          ifasıyla doğrudan ilgili olması</em> hukuki sebeplerine dayanılarak işlenmektedir.
        </p>
      </Section>

      <Section title="5. Saklama Süresi">
        <p>
          Kişisel verileriniz, iletişim talebinizin yanıtlanmasından itibaren <strong className="text-white">2 (iki) yıl</strong> süreyle
          saklanmakta; bu sürenin dolması ya da tarafınızca silinme talebinde bulunulması halinde imha edilmektedir.
        </p>
      </Section>

      <Section title="6. Kişisel Verilerin Aktarılması">
        <p>
          İletişim formu aracılığıyla ilettiğiniz veriler, barındırma hizmeti aldığımız Supabase Inc.
          veritabanı altyapısında saklanmakta ve yalnızca yetkili Sitelya çalışanları tarafından
          görüntülenebilmektedir. Verileriniz üçüncü kişilerle ticari amaçla paylaşılmamaktadır.
        </p>
      </Section>

      <Section title="7. KVKK Madde 11 Kapsamındaki Haklarınız">
        <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>KVKK&apos;nın 7. maddesi çerçevesinde silinmesini veya yok edilmesini isteme</li>
          <li>İşlenen verilerin münhasıran otomatik sistemler aracılığıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
          <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
        </ul>
      </Section>

      <Section title="8. Başvuru Yolu">
        <p>
          Yukarıdaki haklarınızı kullanmak için{' '}
          <a href={`mailto:${EMAIL}`} className="text-[#60a5fa] hover:text-white transition-colors" translate="no">{EMAIL}</a>{' '}
          adresine kimliğinizi doğrulayan bilgilerle birlikte yazılı olarak başvurabilirsiniz.
          Başvurunuz en geç <strong className="text-white">30 gün</strong> içinde yanıtlanacaktır.
        </p>
      </Section>

      <Section title="9. Güncellemeler">
        <p>
          Bu politika gerektiğinde güncellenebilir. Güncel versiyon her zaman bu sayfada yayınlanır.
          Son güncelleme: <strong className="text-white">Mayıs 2026</strong>.
        </p>
      </Section>
    </>
  );
}

function EnContent() {
  return (
    <>
      <Section title="1. Data Controller">
        <p>
          Your personal data is processed by <strong className="text-white">Sitelya Agency</strong> as
          the data controller within the scope and purposes described below, in accordance with applicable
          data protection laws.
        </p>
        <p>Contact: <a href={`mailto:${EMAIL}`} className="text-[#60a5fa] hover:text-white transition-colors" translate="no">{EMAIL}</a></p>
      </Section>

      <Section title="2. Data Collected">
        <p>The following personal data is collected through our website contact form:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Message content submitted by you</li>
        </ul>
      </Section>

      <Section title="3. Purpose of Processing">
        <p>Your personal data is processed solely for the following purposes:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Responding to your contact requests and questions</li>
          <li>Providing information about requested services</li>
          <li>Conducting business discussions and preparing proposals</li>
        </ul>
      </Section>

      <Section title="4. Legal Basis">
        <p>
          Your personal data is processed based on your <em>explicit consent</em> given when submitting
          the contact form, and where necessary for <em>steps taken at your request prior to entering
          into a contract</em>.
        </p>
      </Section>

      <Section title="5. Retention Period">
        <p>
          Your personal data is retained for <strong className="text-white">2 (two) years</strong> from
          the date your enquiry is resolved, after which it is securely deleted. You may request deletion
          at any time before this period expires.
        </p>
      </Section>

      <Section title="6. Data Sharing">
        <p>
          Data you submit through the contact form is stored on the database infrastructure of our
          hosting provider Supabase Inc. and can only be viewed by authorized Sitelya staff. Your data
          is not shared with third parties for commercial purposes.
        </p>
      </Section>

      <Section title="7. Your Rights">
        <p>You have the following rights regarding your personal data:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Right to access your personal data</li>
          <li>Right to rectification of inaccurate data</li>
          <li>Right to erasure (&ldquo;right to be forgotten&rdquo;)</li>
          <li>Right to restriction of processing</li>
          <li>Right to data portability</li>
          <li>Right to object to processing</li>
          <li>Right to lodge a complaint with a supervisory authority</li>
        </ul>
      </Section>

      <Section title="8. How to Exercise Your Rights">
        <p>
          To exercise any of the above rights, please contact us at{' '}
          <a href={`mailto:${EMAIL}`} className="text-[#60a5fa] hover:text-white transition-colors" translate="no">{EMAIL}</a>{' '}
          with sufficient information to verify your identity. We will respond within{' '}
          <strong className="text-white">30 days</strong>.
        </p>
      </Section>

      <Section title="9. Updates">
        <p>
          This policy may be updated from time to time. The current version is always published on this
          page. Last updated: <strong className="text-white">May 2026</strong>.
        </p>
      </Section>
    </>
  );
}

export default function PrivacyContent() {
  const locale = useLocale();
  const isTr = locale === 'tr';

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink pb-24 pt-16 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-grid mask-radial" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="eyebrow mb-5">{isTr ? 'KVKK' : 'Privacy'}</span>
          <h1 className="heading-lg text-balance text-white mb-3">
            {isTr ? 'Gizlilik Politikası ve KVKK Aydınlatma Metni' : 'Privacy Policy'}
          </h1>
          <p className="text-white/50 text-sm">
            {isTr ? 'Sitelya Agency — Kişisel Verilerin Korunması' : 'Sitelya Agency — Personal Data Protection'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-6 sm:p-10"
        >
          {isTr ? <TrContent /> : <EnContent />}
        </motion.div>
      </div>
    </section>
  );
}
