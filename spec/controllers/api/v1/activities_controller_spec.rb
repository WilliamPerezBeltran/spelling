# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ActivitiesController do
  it 'gets a new term' do
    get :index

    json = JSON.parse(response.body)

    expect(response).to be_successful

    expect(json['data']['attributes']['term']).not_to be_nil
  end
end
