<template>
    <section class="site-section">
        <div class="container">
            <div class="title">
                <h1>
                    <?php echo $title; ?>
                </h1>
            </div>

            <div class="text">
                <?php the_content(); ?>
            </div>

            <form>
                <div class="form__group first-of-class">
                    <div class="field field--ifl">
                        <label for="contact-email" class="form__label">E-mailadres *</label>
                        [email* contact-email class:form__input id:contact-email maxlength:128 placeholder "mail@voorbeeld.nl"]
                    </div>

                    <div class="field field--ifl">
                        <label for="contact-name" class="form__label">Naam</label>
                        [text contact-name class:form__input id:contact-name maxlength:128 placeholder "Peter Zwart"]
                    </div>
                </div>

                <div class="form__group">
                    <div class="field field--ifl">
                        <label for="contact-subject" class="form__label">Onderwerp *</label>
                        [text* contact-subject class:form__input id:contact-subject maxlength:128 placeholder "Ik wil het graag met je hebben over..."]
                    </div>

                    <div class="field field--ifl">
                        <label for="contact-message" class="form__label">Message *</label>
                        [textarea* contact-message class:form__input id:contact-message rows:8 placeholder "Deze prachtige website; erg prachtig, helemaal tof."]
                    </div>
                </div>

                <div class="form__group">
                    [cf7mc]
                </div>

                <div class="form__group">
                    <span>* veld is vereisd</span>

                    <div class="field field--inline">
                        [submit class:btn class:btn--primary string-send:Verzend string-sending "Aan het verzenden"]
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
