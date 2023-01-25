package com.dev.backend.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.backend.dto.PessoaClienteRequestDTO;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.repository.PessoaClienteRepository;

@Service
public class PessoaClienteService {

	@Autowired
	private PessoaClienteRepository pessoaRepository;
	
	@Autowired
	private PermissaoPessoaService permissaoPessoaService;
	
	@Autowired
	private EmailService emailService;

	
	public Pessoa registrar(PessoaClienteRequestDTO pessoaClienteRequestDTO) {
		Pessoa pessoa = new PessoaClienteRequestDTO().converter(pessoaClienteRequestDTO);
		pessoa.setDataCriacao(new Date());
		Pessoa pessoaNova = pessoaRepository.saveAndFlush(pessoa);
		permissaoPessoaService.vincularPessoaPermissaoCLiente(pessoaNova);
		emailService.enviarEmailTexto(pessoaNova.getEmail(), "Cadastro na Loja Teste", "O registro foi realizado com sucesso");
		return pessoaNova;
	}
}
