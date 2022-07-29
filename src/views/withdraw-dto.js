class WithdrawDTO {
  constructor(withdraw) {
    const { id, description, value } = withdraw

    this.id = id
    this.description = description
    this.value = value
  }

  toJson() {
    return {
      id: this.id,
      description: this.description,
      value: this.value
    }
  }
}

export default WithdrawDTO
