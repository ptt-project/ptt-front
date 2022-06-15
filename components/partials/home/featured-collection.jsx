import React from 'react';
import Reveal from 'react-awesome-reveal';

import ProductTwo from '~/components/features/product/product-two';
import ALink from '~/components/features/custom-link';

import { fadeIn } from '~/utils/data/keyframes';

function BestCollection( props ) {
    const { products, loading } = props;

    return (
        <section className="product-wrapper mb-8">
            <Reveal keyframes={ fadeIn } delay={ 300 } triggerOnce>
                <h2 className="title title-line title-underline with-link">
                    Featured Product
                    <ALink href="/shop" className="font-weight-semi-bold">
                        View more <i className="d-icon-arrow-right"></i>
                    </ALink>
                </h2>
            </Reveal>

            <Reveal keyframes={ fadeIn } triggerOnce>
                {
                    loading ?
                        <div className="row gutter-xs">
                            {
                                [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( ( item ) =>
                                    <div
                                        className="product-loading-overlay col-lg-3 col-md-4 col-6 mb-4"
                                        key={ 'best-selling-skel-' + item }>
                                    </div>
                                )
                            }
                        </div>
                        :
                        <div className="row gutter-xs">
                            {
                                products && products.map( item =>
                                    <div
                                        className="col-lg-3 col-md-4 col-6 mb-4"
                                        key={ 'best-selling-' + item.name }>
                                        <ProductTwo product={ item } />
                                    </div>
                                )
                            }
                        </div>
                }
            </Reveal>
        </section >
    )
}

export default React.memo( BestCollection );
