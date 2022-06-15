import Reveal from 'react-awesome-reveal';

import { blurIn } from '~/utils/data/keyframes';

export default function PromoSection() {
    return (
        <Reveal keyframes={ blurIn } delay={ 200 } triggerOnce>
            <section className="banner banner-cta mb-7 text-center"
                style={ { backgroundImage: `url(./images/home/banner.jpg)`, backgroundColor: "#c5d1d2" } }>
                <div className="banner-content w-100">
                    <h4 className="banner-subtitle font-weight-bold ls-s text-white text-uppercase">Coming
                    soon</h4>
                    <h2 className="banner-title font-weight-normal ls-m"><strong>Black Friday</strong> Sale</h2>
                    <p className="font-primary text-dark ls-normal text-capitalize lh-1">Get 10% off first
                    order</p>
                    <form action="#" method="get" className="input-wrapper input-wrapper-inline">
                        <input type="email" className="form-control mb-4" name="email" id="email-new" aria-label="newsletter"
                            placeholder="Email address here..." required />
                        <button className="btn btn-secondary btn-sm" type="submit" style={ { lineHeight: 1.4 } }>Subscribe<i
                            className="d-icon-arrow-right"></i></button>
                    </form>
                </div>
            </section>
        </Reveal>
    )
}