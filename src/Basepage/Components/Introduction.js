import React from 'react';


const Introduction = ({user}) => {

  return (   
    <section className=" pa3 f5  ml4 mt3 mw5 ba b--black-70 mw6-ns sss mv4">
      <p > Šajā mājaslapas sadaļā var pievienot savus izdomātos uzdevumus, lai citi tos varētu pildīt.</p>
      No sākuma aizpildi lejā redzamos laukus ar savu uzdevumu un pēc tam izvēlies pie kuras tēmas uzdevums piederas, tas arī viss
    <h3> Uzdevumu pievienos ar epastu : {user.email}</h3>
    </section>
    )
}
export default Introduction